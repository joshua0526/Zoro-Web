namespace what
{
    export class AppChainTool
    {
        static async initAllAppChain(){
            var allChainHash = await WWW.api_getAllAppChain();
            for (var a in allChainHash){
                var chainHash = allChainHash[a];
            }
        }
    }
}