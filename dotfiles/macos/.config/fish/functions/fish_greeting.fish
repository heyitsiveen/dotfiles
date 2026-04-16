function fish_greeting -d "Custom greeting with fastfetch"
    if type -q fastfetch
        fastfetch
    end
end
