
# Define the directories
directories=("lara-api" "react-font")

# Loop through the directories
for dir in "${directories[@]}"; do
    # Check if the directory exists
    if [ -d "$dir" ]; then
        echo "Entering directory: $dir"
        cd "$dir" || exit 1

        # Run docker-compose down
        echo "Running docker-compose down in $dir"
        docker-compose down

        # Run docker-compose up -d
        echo "Running docker-compose up -d in $dir"
        docker-compose up -d

        # Return to the parent directory
        cd ..
    else
        echo "Directory $dir not found."
    fi
done

echo "Script completed."
