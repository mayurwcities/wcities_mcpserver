# wcities_mcpserver

to crate the mcp server for wcities do the below steps

fetch this repository and enter to the directory.

create .env file and add the 
OAUTH_TOKEN=XXXXXXXXXXXXXXXXXXXXXXX
PORT=3001


after creatioon of .env file execute "npm install"


Follow the given steps to enable mcp server in cursor

1 - Click Settings
2 - Click On Tools & MCP
3 - New MCP Server
4 - In new MCP Server Add This json
{
  "mcpServers": {
    "wcities": {
      "command": "node",
      "args": ["D:\\wcities_mcp\\mcp-server.js"],
      "env": {
        "OAUTH_TOKEN": "XXXXXXXXXXXXXXXXXXXXXXX"
      }
    }
  }
}
