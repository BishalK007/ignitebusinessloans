import json
import sys
import os


def deep_merge(source, destination):
    for key, value in source.items():
        if key == "name" and key in destination:
            destination[key] = destination[key] + " " + value
        elif key == "postCreateCommand" and key in destination:
            destination[key] = destination[key] + "; " + value
        elif key == "extensions" and key in destination and isinstance(value, list) and isinstance(destination[key], list):
            # For extensions, combine the lists without duplicates
            destination[key] = list(set(destination[key] + value))
        elif key in destination and isinstance(value, dict) and isinstance(destination[key], dict):
            deep_merge(value, destination[key])
        else:
            destination[key] = value
    return destination

def merge_json_files(files, output_file):
    merged = {}
    try:
        for file in files:
            with open(file, 'r') as f:
                data = json.load(f)
            deep_merge(data, merged)
    except Exception as e:
        print("Error reading JSON files:", e)
        sys.exit(1)
    
    try:
        with open(output_file, 'w') as f:
            json.dump(merged, f, indent=4)
    except Exception as e:
        print("Error writing to output file:", e)
        sys.exit(1)

def get_default_package_manager(s):
    match s:
        case _ if "npm" in s:
            return "npm"
        case _ if "bun" in s:
            return "bun"
        case _ if "deno" in s:
            return "deno"
        case _ if "yarn" in s:
            return "yarn"
        case _ if "pnpm" in s:
            return "pnpm"
        case _:
            return None

def get_toolings():
    toolings = []
    runtimes_dir = os.path.join(os.path.dirname(__file__), "toolings")
    try:
        for filename in os.listdir(runtimes_dir):
            full_path = os.path.join(runtimes_dir, filename)
            if os.path.isfile(full_path):
                toolings.append({'name': filename, 'full_path': full_path})
    except Exception as e:
        print("Error reading runtimes folder:", e)
    return toolings

def get_extentions():
    extentions = []
    runtimes_dir = os.path.join(os.path.dirname(__file__), "extentions")
    for filename in os.listdir(runtimes_dir):
        full_path = os.path.join(runtimes_dir, filename)
        if os.path.isfile(full_path):
            try:
                with open(full_path, 'r') as f:
                    data = json.load(f)
                ext_list = data.get("customizations", {}).get("vscode", {}).get("extensions", [])
            except Exception as e:
                print("Error reading extension file:", full_path, e)
                ext_list = []
            extentions.append({
                "name": filename,
                "full_path": full_path,
                "extentions": ext_list
            })
    return extentions

def main():

    # At first copy devcontainer-root.json to devcontainer.json
    base_config_path = os.path.join(os.path.dirname(__file__), "templates", "devcontainer-root.json")
    try:
        with open(base_config_path, 'r') as f:
            base_config = json.load(f)
    except Exception as e:
        print("Error reading devcontainer-root.json:", e)
        sys.exit(1)
    dest_path = os.path.join(os.path.dirname(__file__), "devcontainer.json")
    merge_json_files([base_config_path], dest_path)
    print(f"Merged {base_config_path} written to: {dest_path}")


    # Ask user for their tooling
    # can select multiple toolings
    # prints the selected tools
    print("\nSelect primary tooling (choose multiple by separating numbers with spaces):")
    toolings = get_toolings()
    for index, tool in enumerate(toolings, start=1):
        print(f"{index}. {os.path.splitext(tool['name'])[0]}")
    choice_input = input("\nEnter your choice(s): ").strip()
    selected_choices = [choice for choice in choice_input.split() if choice.isdigit()]
    if not selected_choices or any(int(choice) < 1 or int(choice) > len(toolings) for choice in selected_choices):
        print("Invalid selection.")
        sys.exit(1)
    selected_tools = [toolings[int(choice) - 1] for choice in selected_choices]
    print("\nYour selection(s):", " ".join([os.path.splitext(tool['name'])[0] for tool in selected_tools]))
    

    # Derive default package manager from the selected tooling names.
    tooling_names = " ".join([os.path.splitext(tool['name'])[0] for tool in selected_tools])
    default_pm = get_default_package_manager(tooling_names)
    if default_pm is None:
        print("Invalid default package manager selection from tooling names.")
        sys.exit(1)
    print("Default package manager set to:", default_pm)

    
    # From the tooling choice merge 
    #   - toolings[] (the selected tooling JSON files)
    # into devcontainer.json
    
    # Merge
    output_path = os.path.join(os.path.dirname(__file__), "devcontainer.json")
    config_files = [output_path] + [tool['full_path'] for tool in selected_tools]
    merge_json_files(config_files, output_path)
    print("Merged configuration written to:", output_path)


    # Ask user for typescript 
    # based on default package manager append into devcontainer.json
    typescript_choice = input("\nDo you want to include TypeScript? [y/n] (default: y): ").strip()
    if default_pm in ("bun", "deno"):
        print(f"TypeScript is pre bundled with {default_pm} and tsc utilises node hence skipping...")
    elif typescript_choice.lower() not in ('n', 'no'):
        extras_path = os.path.join(os.path.dirname(__file__), "extras", f"typescript-{default_pm}.json")
        output_path = os.path.join(os.path.dirname(__file__), "devcontainer.json")
        merge_json_files([output_path, extras_path], output_path)
        print("TypeScript configuration merged into devcontainer.json.")
    

    # Print available extension file names along with the extensions they provide
    extensions = get_extentions()
    if extensions:
        print("\nAvailable extension files and their extensions:")
        for index, ext in enumerate(extensions, start=1):
            print(f"{index}. {ext['name']} ->")
            if ext["extentions"]:
                for e in ext["extentions"]:
                    print(f"    - {e}")
            else:
                print("    - No extensions found")
        ext_choice_input = input("\nEnter extension file choice(s) (separate numbers by space) or press Enter to skip: ").strip()
        if ext_choice_input:
            selected_choices = [choice for choice in ext_choice_input.split() if choice.isdigit()]
            if not selected_choices or any(int(choice) < 1 or int(choice) > len(extensions) for choice in selected_choices):
                print("Invalid extension selection.")
            else:
                selected_ext_files = [extensions[int(choice) - 1]["full_path"] for choice in selected_choices]
                # Merge the current devcontainer.json with the selected extension JSON files
                config_files = [output_path] + selected_ext_files
                merge_json_files(config_files, output_path)
                print("Extension configuration merged into devcontainer.json.")
    else:
        print("No extension files found.")


if __name__ == "__main__":
    main()