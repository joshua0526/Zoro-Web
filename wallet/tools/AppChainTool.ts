namespace what
{
    export class AppChainTool
    {
        static chainName2Hash: { [id: string]: string } = {};
        static appChainLength:number = 1;
        static async initAllAppChain(){
            var allChainHash = await WWW.api_getAllAppChain();
            this.chainName2Hash["AppRoot"] = "0";
            this.appChainLength = 1; 
            for (var a in allChainHash){
                var chainHash = allChainHash[a];
                var chainName = await WWW.api_getAppChainName(chainHash);
                this.chainName2Hash[chainName] = chainHash;
                this.appChainLength++;
            }  
            return this.chainName2Hash;          
        }
    }
}