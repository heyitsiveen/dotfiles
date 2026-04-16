function backup -d "Create a timestamped backup of a file"
    if test (count $argv) -eq 0
        echo "Usage: backup <file> [destination]"
        echo "Creates: filename.YYYYMMDD-HHMMSS.bak"
        return 1
    end

    set -l source_file $argv[1]
    
    if not test -f $source_file
        echo "Error: File '$source_file' not found"
        return 1
    end

    # Generate timestamp: YYYYMMDD-HHMMSS
    set -l timestamp (date +"%Y%m%d-%H%M%S")
    
    # Get filename and directory
    set -l basename (path basename $source_file)
    set -l dirname (path dirname $source_file)
    
    # Determine destination and create backup filename
    if test (count $argv) -ge 2
        set -l dest_dir $argv[2]
        if not test -d $dest_dir
            echo "Error: Destination directory '$dest_dir' not found"
            return 1
        end
        set backup_file "$dest_dir/$basename.$timestamp.bak"
    else
        set backup_file "$dirname/$basename.$timestamp.bak"
    end

    # Create backup
    cp $source_file $backup_file
    
    if test $status -eq 0
        echo "Backup created: $backup_file"
    else
        echo "Error: Failed to create backup"
        return 1
    end
end
