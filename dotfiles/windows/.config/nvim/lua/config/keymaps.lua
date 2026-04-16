-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here

local map = vim.keymap.set
local opts = { noremap = true, silent = true }

-- Line navigation
-- Go to start/end of line (easier to reach than 0 and $)
map({ "n", "v" }, "gh", "_", { desc = "Go to start of line" })
map({ "n", "v" }, "gl", "$", { desc = "Go to end of line" })

-- Delete without yanking
map({ "n", "v" }, "<leader>d", '"_d', { desc = "Delete without yank" })

-- Select all
map("n", "<leader>a", "gg<S-v>G", { desc = "Select all" })

-- Increment/Decrement
map("n", "+", "<C-a>", { desc = "Increment number" })
map("n", "-", "<C-x>", { desc = "Decrement number" })
