function tide_palette --argument-names palette
  switch $palette
    case heyitsiveen
      _tide_palette_heyitsiveen
      set -U dotfiles_tide_palette $palette
    case vercel
      _tide_palette_vercel
      set -U dotfiles_tide_palette $palette
    case vesper
      _tide_palette_vesper
      set -U dotfiles_tide_palette $palette
    case list
      echo "Available palettes:"
      echo "  heyitsiveen"
      echo "  vercel"
      echo "  vesper"
    case '*'
      echo "Usage: tide_palette [heyitsiveen|vercel|vesper|list]"
      return 1
  end
end
