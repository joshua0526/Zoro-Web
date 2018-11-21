namespace what
{
    export class WWW
    {
        // static api: string = "http://118.89.149.43:20332/";
        // static rpc: string = "http://118.89.149.43:20332/";
        static api: string = "http://127.0.0.1:20332/";
        static rpc: string = "http://127.0.0.1:20332/";
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
            for (var i = 0; i < _params[0].length; i++)
            {
                params.push(_params[0][i]);
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
        static async rpc_postRawTransaction(data: any): Promise<boolean>
        {
            var postdata = WWW.makeRpcPostBody("sendrawtransaction", data);
            var result = await fetch(WWW.api, { "method": "post", "body":JSON.stringify(postdata)});
            var json = await result.json();
            var r = json["result"] as boolean;
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

        static testBytesToString(data):string{
            var sb = "";
            for (var i = 0; i < data.length; i++){
                var str = data[i].toString(16);
                if (str.length == 1){
                    str = "0" + str;
                }
                sb += str;
            }
            return sb;
        }

        static stringToByte(str){
			var bytes = [];
			var len, c;
			len = str.length;
			for(var i = 0; i < len; i++) {
				c = str.charCodeAt(i);
				if(c >= 0x010000 && c <= 0x10FFFF) {
					bytes.push(((c >> 18) & 0x07) | 0xF0);
					bytes.push(((c >> 12) & 0x3F) | 0x80);
					bytes.push(((c >> 6) & 0x3F) | 0x80);
					bytes.push((c & 0x3F) | 0x80);
				} else if(c >= 0x000800 && c <= 0x00FFFF) {
					bytes.push(((c >> 12) & 0x0F) | 0xE0);
					bytes.push(((c >> 6) & 0x3F) | 0x80);
					bytes.push((c & 0x3F) | 0x80);
				} else if(c >= 0x000080 && c <= 0x0007FF) {
					bytes.push(((c >> 6) & 0x1F) | 0xC0);
					bytes.push((c & 0x3F) | 0x80);
				} else {
					bytes.push(c & 0xFF);
				}
			}
			return bytes;
		}
    }
}