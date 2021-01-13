 { pkgs, config }:
let
 iamp2p-build = pkgs.writeShellScriptBin "iamp2p-build"
 ''
 set -euxo pipefail
 ${pkgs.nodejs}/bin/npm run build
 cd dist && zip iamp2p-ui -r . && cd ..
 '';

 tag = "v${config.release.version.current}";

 release-github-zip = pkgs.writeShellScriptBin "release-github-zip"
 ''
 set -euxo pipefail
 export zip_artifact='./dist/iamp2p-ui.zip'
 export zip_artifact_name='iamp2p-ui.zip'
 export tag=''${CIRCLE_TAG:-${tag}}
 iamp2p-build
 github-release upload --file "$zip_artifact" --owner ${config.release.github.owner} --repo ${config.release.github.repo} --tag $tag --name $zip_artifact_name --token $GITHUB_DEPLOY_TOKEN
 '';
in
{
 buildInputs = [ iamp2p-build release-github-zip ];
}
