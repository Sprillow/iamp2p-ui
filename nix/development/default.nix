{ pkgs }:
let
 iamp2p-ui = pkgs.writeShellScriptBin "iamp2p-ui"
 ''
 set -euxo pipefail
 ${pkgs.nodejs}/bin/npm start
 '';
in
{
 buildInputs = [ iamp2p-ui ];
}