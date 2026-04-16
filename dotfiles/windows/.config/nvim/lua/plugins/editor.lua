return {
  {
    "folke/snacks.nvim",
    keys = {
      -- Find Plugin File
      {
        "<leader>fP",
        function()
          Snacks.picker.files({
            cwd = require("lazy.core.config").options.root,
          })
        end,
        desc = "Find Plugin File",
      },
      -- Find files (respects .gitignore, shows hidden)
      {
        ";f",
        function()
          Snacks.picker.files({
            hidden = true,
          })
        end,
        desc = "Lists files in your current working directory, respects .gitignore",
      },
      -- Live grep
      {
        ";r",
        function()
          Snacks.picker.grep({
            hidden = true,
          })
        end,
        desc = "Search for a string in your current working directory",
      },
      -- Buffers
      {
        "\\\\",
        function()
          Snacks.picker.buffers()
        end,
        desc = "Lists open buffers",
      },
      -- Help tags
      {
        ";t",
        function()
          Snacks.picker.help()
        end,
        desc = "Lists available help tags",
      },
      -- Resume
      {
        ";;",
        function()
          Snacks.picker.resume()
        end,
        desc = "Resume the previous picker",
      },
      -- Diagnostics
      {
        ";e",
        function()
          Snacks.picker.diagnostics()
        end,
        desc = "Lists Diagnostics for all open buffers",
      },
      -- Treesitter symbols
      {
        ";s",
        function()
          Snacks.picker.treesitter()
        end,
        desc = "Lists Function names, variables, from Treesitter",
      },
      -- LSP incoming calls
      {
        ";c",
        function()
          Snacks.picker.lsp_incoming_calls()
        end,
        desc = "Lists LSP incoming calls for word under the cursor",
      },
      -- File browser (snacks explorer)
      -- {
      --   "sf",
      --   function()
      --     Snacks.picker.explorer({
      --       cwd = vim.fn.expand("%:p:h"),
      --       hidden = true,
      --       ignored = false,
      --       layout = {
      --         preset = "dropdown",
      --       },
      --     })
      --   end,
      --   desc = "Open File Browser with the path of the current buffer",
      -- },
    },
  },

  -- File browser (telescope)
  -- We used telescope for the file browser because it's customizable
  {
    "nvim-telescope/telescope.nvim",
    dependencies = {
      "nvim-telescope/telescope-file-browser.nvim",
    },
    keys = {
      {
        "sf",
        function()
          local telescope = require("telescope")

          local function telescope_buffer_dir()
            return vim.fn.expand("%:p:h")
          end

          telescope.extensions.file_browser.file_browser({
            path = "%:p:h",
            cwd = telescope_buffer_dir(),
            respect_gitignore = false,
            hidden = true,
            grouped = true,
            previewer = false,
            initial_mode = "normal",
            layout_config = { height = 40 },
            winblend = 10,
          })
        end,
        desc = "Open File Browser with the path of the current buffer",
      },
    },
    config = function(_, opts)
      local telescope = require("telescope")
      local actions = require("telescope.actions")
      local fb_actions = telescope.extensions.file_browser.actions

      opts = opts or {}
      opts.extensions = {
        file_browser = {
          theme = "dropdown",
          hijack_netrw = true,
          mappings = {
            ["n"] = {
              ["N"] = fb_actions.create,
              ["h"] = fb_actions.goto_parent_dir,
              ["/"] = function()
                vim.cmd("startinsert")
              end,
              ["<C-u>"] = function(prompt_bufnr)
                for i = 1, 10 do
                  actions.move_selection_previous(prompt_bufnr)
                end
              end,
              ["<C-d>"] = function(prompt_bufnr)
                for i = 1, 10 do
                  actions.move_selection_next(prompt_bufnr)
                end
              end,
              ["<PageUp>"] = actions.preview_scrolling_up,
              ["<PageDown>"] = actions.preview_scrolling_down,
            },
          },
        },
      }

      telescope.setup(opts)
      telescope.load_extension("file_browser")
    end,
  },
}

-- return {
--   {
--     "nvim-telescope/telescope.nvim",
--     dependencies = {
--       {
--         "nvim-telescope/telescope-fzf-native.nvim",
--         build = "make",
--       },
--       "nvim-telescope/telescope-file-browser.nvim",
--     },
--     opts = {
--       defaults = {
--         wrap_results = true,
--         layout_strategy = "horizontal",
--         layout_config = { prompt_position = "top" },
--         sorting_strategy = "ascending",
--         winblend = 0,
--         mappings = {
--           n = {},
--         },
--       },
--       pickers = {
--         diagnostics = {
--           theme = "ivy",
--           initial_mode = "normal",
--           layout_config = {
--             preview_cutoff = 9999,
--           },
--         },
--       },
--     },
--     keys = {
--       {
--         "<leader>fP",
--         function()
--           require("telescope.builtin").find_files({
--             cwd = require("lazy.core.config").options.root,
--           })
--         end,
--         desc = "Find Plugin File",
--       },
--       {
--         ";f",
--         function()
--           local builtin = require("telescope.builtin")
--           builtin.find_files({
--             no_ignore = false,
--             hidden = true,
--           })
--         end,
--         desc = "Lists files in your current working directory, respects .gitignore",
--       },
--       {
--         ";r",
--         function()
--           local builtin = require("telescope.builtin")
--           builtin.live_grep({
--             additional_args = { "--hidden" },
--           })
--         end,
--         desc = "Search for a string in your current working directory",
--       },
--
--       Live Grep with Preview similar to Snacks Picker Grep
--       {
--        ";r",
--        function()
--          local builtin = require("telescope.builtin")
--          builtin.live_grep({
--            additional_args = { "--hidden" },
--            layout_strategy = "vertical",
--            layout_config = {
--              vertical = {
--                prompt_position = "top",
--                mirror = true, -- flip: prompt top, preview bottom
--              },
--              preview_cutoff = 1,
--            },
--            sorting_strategy = "ascending",
--          })
--        end,
--        desc = "Search for a string in your current working directory",
--      },
--
--       {
--         "\\\\",
--         function()
--           local builtin = require("telescope.builtin")
--           builtin.buffers()
--         end,
--         desc = "Lists open buffers",
--       },
--       {
--         ";t",
--         function()
--           local builtin = require("telescope.builtin")
--           builtin.help_tags()
--         end,
--         desc = "Lists available help tags",
--       },
--       {
--         ";;",
--         function()
--           local builtin = require("telescope.builtin")
--           builtin.resume()
--         end,
--         desc = "Resume the previous telescope picker",
--       },
--       {
--         ";e",
--         function()
--           local builtin = require("telescope.builtin")
--           builtin.diagnostics()
--         end,
--         desc = "Lists Diagnostics for all open buffers",
--       },
--       {
--         ";s",
--         function()
--           local builtin = require("telescope.builtin")
--           builtin.treesitter()
--         end,
--         desc = "Lists Function names, variables, from Treesitter",
--       },
--       {
--         ";c",
--         function()
--           local builtin = require("telescope.builtin")
--           builtin.lsp_incoming_calls()
--         end,
--         desc = "Lists LSP incoming calls for word under the cursor",
--       },
--       {
--         "sf",
--         function()
--           local telescope = require("telescope")
--
--           local function telescope_buffer_dir()
--             return vim.fn.expand("%:p:h")
--           end
--
--           telescope.extensions.file_browser.file_browser({
--             path = "%:p:h",
--             cwd = telescope_buffer_dir(),
--             respect_gitignore = false,
--             hidden = true,
--             grouped = true,
--             previewer = false,
--             initial_mode = "normal",
--             layout_config = { height = 40 },
--           })
--         end,
--         desc = "Open File Browser with the path of the current buffer",
--       },
--     },
--     config = function(_, opts)
--       local telescope = require("telescope")
--       local actions = require("telescope.actions")
--       local fb_actions = telescope.extensions.file_browser.actions
--
--       opts.extensions = {
--         file_browser = {
--           theme = "dropdown",
--           hijack_netrw = true,
--           mappings = {
--             ["n"] = {
--               ["N"] = fb_actions.create,
--               ["h"] = fb_actions.goto_parent_dir,
--               ["/"] = function()
--                 vim.cmd("startinsert")
--               end,
--               ["<C-u>"] = function(prompt_bufnr)
--                 for i = 1, 10 do
--                   actions.move_selection_previous(prompt_bufnr)
--                 end
--               end,
--               ["<C-d>"] = function(prompt_bufnr)
--                 for i = 1, 10 do
--                   actions.move_selection_next(prompt_bufnr)
--                 end
--               end,
--               ["<PageUp>"] = actions.preview_scrolling_up,
--               ["<PageDown>"] = actions.preview_scrolling_down,
--             },
--           },
--         },
--       }
--
--       telescope.setup(opts)
--       telescope.load_extension("fzf")
--       telescope.load_extension("file_browser")
--     end,
--   },
-- }
