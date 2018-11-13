namespace what
{
    export class WWW
    {
        static api: string = "http://115.159.53.39:20332/";
        static rpc: string = "http://115.159.53.39:20332/";
        static rpcName: string = "";

        static blockHeight:number = 0;
        static chainHashLength:number = 1;
        static ContractHash:string = "c4108917282bff79b156d4d01315df811790c0e8";

        static makeRpcUrl(url: string, method: string, ..._params: any[])
        {


            if (url[url.length - 1] != '/')
                url = url + "/";
            var urlout = url + "?jsonrpc=2.0&id=1&method=" + method + "&params=[";
            for (var i = 0; i < _params.length; i++)
            {
                urlout += JSON.stringify(_params[i]);
                if (i != _params.length - 1)
                    urlout += ",";
            }
            urlout += "]";
            return urlout;
        }

        static makeRpcPostBody(method: string, ..._params: any[]): {}
        {
            var body = {};
            body["jsonrpc"] = "2.0";
            body["id"] = 1;
            body["method"] = method;
            var params = [];
            for (var i = 0; i < _params.length; i++)
            {
                params.push(_params[i]);
            }
            body["params"] = params;
            return body;
        }


        static async api_getHeight(chainHash:string)
        {
            var str = WWW.makeRpcUrl(WWW.api, "getblockcount", chainHash);
            var result = await fetch(str, { "method": "get" });
            var json = await result.json();
            var r = json["result"];
            var height = parseInt(r as string) - 1;
            return height;
        }
        static async api_getAllAssets()
        {
            var str = WWW.makeRpcUrl(WWW.api, "getallasset");
            var result = await fetch(str, { "method": "get" });
            var json = await result.json();
            var r = json["result"];
            return r;
        }
        static async api_getUTXO(address: string)
        {
            var str = WWW.makeRpcUrl(WWW.api, "getutxo", address);
            var result = await fetch(str, { "method": "get" });
            var json = await result.json();
            var r = json["result"];
            return r;
        }

        static async api_getAllAppChain(){
            var str = WWW.makeRpcUrl(WWW.api, "getappchainhashlist");
            var result = await fetch(str, {"method":"get"});
            var json = await result.json();
            var r = json["result"]["hashlist"];
            return r;
        }

        static async api_getAppChainName(chainHash:string){
            var str = WWW.makeRpcUrl(WWW.api, "getappchainstate", chainHash);
            var result = await fetch(str, {"method":"get"});
            var json = await result.json();
            var r = json["result"]["name"];
            return r;
        }

        static async  rpc_getHeight()
        {
            var str = WWW.makeRpcUrl(WWW.api, "getblockcount");
            var result = await fetch(str, { "method": "get" });
            var json = await result.json();
            var r = json["result"];
            var height = parseInt(r as string) - 1;
            return height;
        }
        static async rpc_postRawTransaction(data: Uint8Array): Promise<boolean>
        {
            var postdata = WWW.makeRpcPostBody("sendrawtransaction", data.toHexString());
            var result = await fetch(WWW.api, { "method": "post", "body": JSON.stringify(postdata) });
            var json = await result.json();
            var r = json["result"][0]["sendrawtransactionresult"] as boolean;
            return r;
        }
        static async  rpc_getStorage(scripthash: Uint8Array, key: Uint8Array): Promise<string>
        {
            var str = WWW.makeRpcUrl(WWW.api, "getstorage", scripthash.toHexString(), key.toHexString());
            var result = await fetch(str, { "method": "get" });
            var json = await result.json();
            if (json["result"] == null)
                return null;
            var r = json["result"][0] as string;
            return r["storagevalue"];
        }

        static async rpc_getBalanceOf(chainHash:string, address:string){
            var sb = new ThinNeo.ScriptBuilder();
            var array = [];
            array.push("(addr)" + address);             
            sb.EmitParamJson(array);
            sb.EmitPushString("balanceOf");
            sb.EmitAppCall(WWW.ContractHash.hexToBytes().reverse());
            
            var scripthash = sb.ToArray().toHexString();
            var str = this.makeRpcUrl(WWW.api, "invokescript", chainHash, scripthash);
            var result = await fetch(str, {"method":"get"});
            var json = await result.json();
            var r = json["result"]["stack"][0]["value"];           
            if (r == ""){
                r = 0;
            }else{
                r = (r as string).hexToBytes();
                r = Neo.BigInteger.fromUint8ArrayAutoSign(r);
            }
            return r;
        }    
    }
}