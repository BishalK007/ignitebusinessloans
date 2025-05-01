import sys
import os
import subprocess

def connect_container():
    try:
        result = subprocess.check_output(
            ['docker', 'ps', '--format', '{{.ID}}||{{.Names}}||{{.Image}}'], 
            text=True
        )
    except subprocess.CalledProcessError:
        print("Error: Could not run 'docker ps'.")
        return

    containers = [line for line in result.strip().splitlines() if line]
    if not containers:
        print("No running containers found.")
        return

    print("Select a container to connect to:")
    for idx, container in enumerate(containers, start=1):
        parts = container.split("||")
        if len(parts) != 3:
            continue
        container_id, name, image = parts
        print(f"{idx}. ID: {container_id}, Name: {name}, Image: {image}")

    selected = input("Enter container number: ")
    try:
        selected_index = int(selected)
    except ValueError:
        print("Invalid selection.")
        return

    if 1 <= selected_index <= len(containers):
        chosen = containers[selected_index - 1]
        container_id = chosen.split("||")[0]
        curr_foldername = os.path.basename(os.getcwd())
        cmd = [
            "docker", "exec", "-it", "--user", "vscode",
            "--workdir", f"/workspaces/{curr_foldername}",
            container_id, "bash"
        ]
        subprocess.run(cmd)
    else:
        print("Invalid selection.")

if __name__ == "__main__":
    if "--conn" in sys.argv:
        connect_container()