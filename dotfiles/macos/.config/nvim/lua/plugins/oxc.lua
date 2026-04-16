return {
  {
    "neovim/nvim-lspconfig",
    opts = function()
      -- oxlint: linting only (JS/TS)
      vim.lsp.config("oxlint", {
        on_attach = function(client, bufnr)
          -- auto fix on save
          vim.api.nvim_create_autocmd("BufWritePre", {
            buffer = bufnr,
            callback = function()
              client:request_sync("workspace/executeCommand", {
                command = "oxc.fixAll",
                arguments = { { uri = vim.uri_from_bufnr(bufnr) } },
              })
            end,
          })
        end,
      })

      vim.lsp.enable("oxlint")
      vim.lsp.enable("oxfmt")
    end,
  },

  -- oxfmt via conform for ALL supported filetypes
  {
    "stevearc/conform.nvim",
    opts = {
      formatters_by_ft = {
        -- JS/TS (also handled by oxfmt LSP above)
        javascript = { "oxfmt" },
        javascriptreact = { "oxfmt" },
        typescript = { "oxfmt" },
        typescriptreact = { "oxfmt" },
        vue = { "oxfmt" },

        -- Data
        json = { "oxfmt" },
        jsonc = { "oxfmt" },
        json5 = { "oxfmt" },
        yaml = { "oxfmt" },
        toml = { "oxfmt" },

        -- Web
        html = { "oxfmt" },
        css = { "oxfmt" },
        scss = { "oxfmt" },
        less = { "oxfmt" },

        -- Docs
        markdown = { "oxfmt" },
        mdx = { "oxfmt" },

        -- Query
        graphql = { "oxfmt" },
      },
      format_on_save = {
        timeout_ms = 500,
        lsp_format = "fallback",
      },
    },
  },
}
