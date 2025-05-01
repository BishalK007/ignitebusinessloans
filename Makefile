
.PHONY: configure
configure:
	python3 .devcontainer/config.py

.PHONY: connect
connect:
	python3 .devcontainer/others.py --conn