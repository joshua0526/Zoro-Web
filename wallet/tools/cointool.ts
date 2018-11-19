namespace what
{
    export class CoinTool
    {
        static readonly id_GAS: string = "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
        static readonly id_NEO: string = "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
        static assetID2name: { [id: string]: string } = {};
        static name2assetID: { [id: string]: string } = {};
        static async initAllAsset()
        {
            // var allassets = await WWW.api_getAllAssets();
            // for (var a in allassets)
            // {
            //     var asset = allassets[a];
            //     var names = asset.name;
            //     var id = asset.id;
            //     var name: string = "";
            //     if (id == CoinTool.id_GAS)
            //     {
            //         name = "GAS";
            //     }
            //     else if (id == CoinTool.id_NEO)
            //     {
            //         name = "NEO";
            //     }
            //     else
            //     {
            //         for (var i in names)
            //         {
            //             name = names[i].name;
            //             if (names[i].lang == "en")
            //                 break;
            //         }
            //     }
            //     CoinTool.assetID2name[id] = name;
            //     CoinTool.name2assetID[name] = id;
            // }
            CoinTool.name2assetID["BCP"] = WWW.ContractHash; 
        }

        
        static makeTran(address:string, targetaddr:string, sendcount:Neo.Fixed8, assetid:string, chainHash:string): ThinNeo.Transaction
        {
            if (sendcount.compareTo(Neo.Fixed8.Zero) <= 0)
               throw new Error("can not send zero.");           
            
            var array = [];
            var sb = new ThinNeo.ScriptBuilder();            
           
            var randomBytes = new Uint8Array(32);            
            var key = Neo.Cryptography.RandomNumberGenerator.getRandomValues<Uint8Array>(randomBytes);
            var randomNum = new Neo.BigInteger(key);
            sb.EmitPushNumber(randomNum);
            sb.Emit(ThinNeo.OpCode.DROP);
            array.push("(addr)" + address);
            array.push("(addr)" + targetaddr);
            array.push("(int)" + sendcount);
            sb.EmitParamJson(array);
            sb.EmitPushString("transfer");
            sb.EmitAppCall(assetid.hexToBytes().reverse());
            // var scripthash = sb.ToArray().toHexString();

            // var postArray = [];
            // postArray.push(chainHash);
            // postArray.push(scripthash);

            var extdata = new ThinNeo.InvokeTransData();
            extdata.script = sb.ToArray();
            extdata.gas = Neo.Fixed8.Zero;

            var tran = new  ThinNeo.Transaction();
            tran.type = ThinNeo.TransactionType.InvocationTransaction;
            tran.version = 1;
            
            tran.extdata = extdata;

            var scriptHash = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(address);

            tran.attributes = [];
            tran.attributes[0] = new ThinNeo.Attribute();
            tran.attributes[0].usage = ThinNeo.TransactionAttributeUsage.Script;
            tran.attributes[0].data = scriptHash;
            tran.inputs = [];
            tran.outputs = [];
           
            return tran;
        }

    }
}