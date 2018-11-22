///<reference path="../../lib/neo-ts.d.ts"/>
namespace what
{
    export enum FuncTag
    {
        transfer,
        DApp_WhoAmI,
        CreateAppChain
    }
    export class panel_Function
    {
        constructor()
        {

        }
        panel: lightsPanel.panel;
        main: Main;

        init(main: Main): void
        {
            this.main = main;
            this.panel = lightsPanel.panelMgr.instance().createPanel("Function");

            this.panel.divRoot.style.left = "30px";
            this.panel.divRoot.style.top = "200px";
            this.panel.floatWidth = 300;
            this.panel.floatHeight = 400;
            this.panel.canDrag = true;
            this.panel.canScale = true;

            this.panel.onFloat();

            AppChainTool.initAppChainSelectList();
            
            this.setFunc(FuncTag.transfer);
        }

        setFunc(tag: FuncTag): void
        {
            this.panel.divContent.textContent = "";

            switch(tag){
                case FuncTag.transfer:
                    this.main.panelTransaction.panel.floatHeight = 600;
                    lightsPanel.QuickDom.addSpan(this.panel, "Transfer");
                    var btn = lightsPanel.QuickDom.addButton(this.panel, "SendContract");
                    btn.onclick = () =>
                    {
                        this.setFunc(FuncTag.DApp_WhoAmI);
                    };
                    var btn1 = lightsPanel.QuickDom.addButton(this.panel, "CreateAppChain");
                    btn1.onclick = () =>
                    {
                        this.setFunc(FuncTag.CreateAppChain);
                    };
                break;
                case FuncTag.DApp_WhoAmI:
                    this.main.panelTransaction.panel.floatHeight = 600;
                    var btn = lightsPanel.QuickDom.addButton(this.panel, "Transfer");
                    btn.onclick = () =>
                    {
                        this.setFunc(FuncTag.transfer);
                    };
                    lightsPanel.QuickDom.addSpan(this.panel, "SendContract");                    
                    var btn1 = lightsPanel.QuickDom.addButton(this.panel, "CreateAppChain");
                    btn1.onclick = () =>
                    {
                        this.setFunc(FuncTag.CreateAppChain);
                    };
                break;
                case FuncTag.CreateAppChain:
                    this.main.panelTransaction.panel.floatHeight = 1000;
                    var btn = lightsPanel.QuickDom.addButton(this.panel, "transfer");
                    btn.onclick = () =>
                    {
                        this.setFunc(FuncTag.transfer);
                    };
                    var btn1 = lightsPanel.QuickDom.addButton(this.panel, "SendContract");
                    btn1.onclick = () =>
                    {
                        this.setFunc(FuncTag.DApp_WhoAmI);
                    };
                    lightsPanel.QuickDom.addSpan(this.panel, "CreateAppChain");
                break;
            }            
            lightsPanel.QuickDom.addElement(this.panel, "hr");
            if (tag == FuncTag.transfer)
            {
                this.initTransfer();
            }
            if (tag == FuncTag.DApp_WhoAmI)
            {
                this.SendContract();
            }
            if (tag == FuncTag.CreateAppChain)
            {
                this.initCreateAppChain();
            }
        }
        initTransfer(): void
        {
            lightsPanel.QuickDom.addSpan(this.panel, "Target");
            var target = lightsPanel.QuickDom.addTextInput(this.panel, "AMtwRe476ooSmJwVbD5z6J2Jw2ZzzQUFqY");
            lightsPanel.QuickDom.addElement(this.panel, "br");

            lightsPanel.QuickDom.addSpan(this.panel, "Asset Type:");
            var select = document.createElement("select");
            this.panel.divContent.appendChild(select);
            for (var name in CoinTool.name2assetID)
            {
                var sitem = document.createElement("option");
                sitem.text = name;
                select.appendChild(sitem);
            }
            lightsPanel.QuickDom.addElement(this.panel, "br");

            lightsPanel.QuickDom.addSpan(this.panel, "Count");
            var count = lightsPanel.QuickDom.addTextInput(this.panel, "10000");
            lightsPanel.QuickDom.addElement(this.panel, "br");

            var btn = lightsPanel.QuickDom.addButton(this.panel, "MakeTransaction");
            btn.onclick = () =>
            {
                var targetaddr = target.value;
                var asset = (select.childNodes[select.selectedIndex] as HTMLOptionElement).text;
                var assetid = CoinTool.name2assetID[asset];
                var _count = Neo.Fixed8.parse(count.value);
                var tran = CoinTool.makeTran(this.main.panelLoadKey.address, targetaddr, _count, assetid, WWW.ContractHash);
                this.main.panelTransaction.setTran(tran, this.main.panelLoadKey.address);
            }
            lightsPanel.QuickDom.addElement(this.panel, "br");
        }

        initCreateAppChain():void{                     
            lightsPanel.QuickDom.addSpan(this.panel, "AppChainName:");
            var AppChainName = lightsPanel.QuickDom.addTextInput(this.panel, "RootName");
            lightsPanel.QuickDom.addElement(this.panel, "br");
            lightsPanel.QuickDom.addSpan(this.panel, "ChainHash:Fixed.Zero");
            lightsPanel.QuickDom.addElement(this.panel, "br");
            lightsPanel.QuickDom.addSpan(this.panel, "validator1:");
            var pubkey1 = AppChainTool.createSelect(this.panel, "pubkey", 1);
            lightsPanel.QuickDom.addElement(this.panel, "br");
            lightsPanel.QuickDom.addSpan(this.panel, "validator2:");
            var pubkey2 = AppChainTool.createSelect(this.panel, "pubkey", 2);
            lightsPanel.QuickDom.addElement(this.panel, "br");
            lightsPanel.QuickDom.addSpan(this.panel, "validator3:");
            var pubkey3 = AppChainTool.createSelect(this.panel, "pubkey", 3);
            lightsPanel.QuickDom.addElement(this.panel, "br");
            lightsPanel.QuickDom.addSpan(this.panel, "validator4:");
            var pubkey4 = AppChainTool.createSelect(this.panel, "pubkey", 4);
            lightsPanel.QuickDom.addElement(this.panel, "br");
            lightsPanel.QuickDom.addSpan(this.panel, "seed1:");
            var ip1 = AppChainTool.createSelect(this.panel, "ip", 1);
            lightsPanel.QuickDom.addSpan(this.panel, "port1:");
            var seed1 = lightsPanel.QuickDom.addTextInput(this.panel, "58888");
            lightsPanel.QuickDom.addElement(this.panel, "br");
            lightsPanel.QuickDom.addSpan(this.panel, "seed2:");
            var ip2 = AppChainTool.createSelect(this.panel, "ip", 2);
            lightsPanel.QuickDom.addSpan(this.panel, "port2:");
            var seed1 = lightsPanel.QuickDom.addTextInput(this.panel, "58888");
            lightsPanel.QuickDom.addElement(this.panel, "br");
            lightsPanel.QuickDom.addSpan(this.panel, "seed3:");
            var ip3 = AppChainTool.createSelect(this.panel, "ip", 3);
            lightsPanel.QuickDom.addSpan(this.panel, "port3:");
            var seed1 = lightsPanel.QuickDom.addTextInput(this.panel, "58888");
            lightsPanel.QuickDom.addElement(this.panel, "br");
            lightsPanel.QuickDom.addSpan(this.panel, "seed4:");
            var ip4 = AppChainTool.createSelect(this.panel, "ip", 4);
            lightsPanel.QuickDom.addSpan(this.panel, "port4:");
            var seed1 = lightsPanel.QuickDom.addTextInput(this.panel, "58888");
            lightsPanel.QuickDom.addElement(this.panel, "br");

            var btn = lightsPanel.QuickDom.addButton(this.panel, "createAppChain");
            btn.onclick = () =>
            {
                var name = AppChainName.value;
                var pubkey = [(pubkey1.childNodes[pubkey1.selectedIndex] as HTMLOptionElement).value,
                (pubkey2.childNodes[pubkey2.selectedIndex] as HTMLOptionElement).value,
                (pubkey3.childNodes[pubkey3.selectedIndex] as HTMLOptionElement).value,
                (pubkey4.childNodes[pubkey4.selectedIndex] as HTMLOptionElement).value];
                var ip = [(ip1.childNodes[ip1.selectedIndex] as HTMLOptionElement).value,
                (ip2.childNodes[ip2.selectedIndex] as HTMLOptionElement).value,
                (ip3.childNodes[ip3.selectedIndex] as HTMLOptionElement).value,
                (ip4.childNodes[ip4.selectedIndex] as HTMLOptionElement).value];

                var ChainHash = {};
                var tran = AppChainTool.makeTran(name, this.main.panelLoadKey.pubkey, pubkey,ip, ChainHash);
                this.main.panelTransaction.setTranAppChain(tran, pubkey, ip, this.main.panelLoadKey.address, ChainHash["ChainHash"]);
            }
            lightsPanel.QuickDom.addElement(this.panel, "br");
        }

        SendContract(): void
        {
            var pkey = this.main.panelLoadKey.pubkey;
            
            lightsPanel.QuickDom.addSpan(this.panel, "name:");
            var name = lightsPanel.QuickDom.addTextInput(this.panel, "new Contract");
            lightsPanel.QuickDom.addElement(this.panel, "br");

            lightsPanel.QuickDom.addSpan(this.panel, "version:");
            var version = lightsPanel.QuickDom.addTextInput(this.panel, "1.0");
            lightsPanel.QuickDom.addElement(this.panel, "br");

            lightsPanel.QuickDom.addSpan(this.panel, "auther:");
            var auther = lightsPanel.QuickDom.addTextInput(this.panel, "auther");
            lightsPanel.QuickDom.addElement(this.panel, "br");

            lightsPanel.QuickDom.addSpan(this.panel, "email:");
            var email = lightsPanel.QuickDom.addTextInput(this.panel, "123@qq.com");
            lightsPanel.QuickDom.addElement(this.panel, "br");

            lightsPanel.QuickDom.addSpan(this.panel, "description:");
            var description = lightsPanel.QuickDom.addTextInput(this.panel, "description");
            lightsPanel.QuickDom.addElement(this.panel, "br");

            lightsPanel.QuickDom.addSpan(this.panel, "need_storage:");
            var need_storage = lightsPanel.QuickDom.addCheckBox(this.panel, "need_storage");
            lightsPanel.QuickDom.addSpan(this.panel, "need_canCharge:");
            var need_canCharge = lightsPanel.QuickDom.addCheckBox(this.panel, "need_canCharge");
            lightsPanel.QuickDom.addElement(this.panel, "br");


            lightsPanel.QuickDom.addSpan(this.panel, ".avm File");
            var file = document.createElement("input");
            this.panel.divContent.appendChild(file);
            file.type = "file";

            var reader = new FileReader();
            reader.onload = (e: Event) =>
            {
                var parameter__list = "0710".hexToBytes();
                var return_type = "05".hexToBytes();
                var ContractAvm = reader.result as ArrayBuffer;                
                var storage = 1;
                var nep4 = 0;
                var canCharge = 4;
                var btn = document.createElement("button");
                btn.onclick = async () => {
                    var sb = new ThinNeo.ScriptBuilder();
                    storage = need_storage.checked?storage:0;
                    nep4 = nep4;
                    canCharge = need_canCharge.checked?canCharge:4;
                    var ss = storage|nep4|canCharge;
                    sb.EmitPushString(description.value); 
                    sb.EmitPushString(email.value); 
                    sb.EmitPushString(auther.value);
                    sb.EmitPushString(version.value); 
                    sb.EmitPushString(name.value);   
                    sb.EmitPushNumber(new Neo.BigInteger(ss));
                    sb.EmitPushBytes(return_type);
                    sb.EmitPushBytes(parameter__list);
                    var contract = new Uint8Array(ContractAvm);
                    sb.EmitPushBytes(contract);
                    sb.EmitSysCall("Neo.Contract.Create"); 
                    
                    var scriptPublish = sb.ToArray().toHexString();
                    var postArray = [];
                    postArray.push(this.main.panelState.chainHash);
                    postArray.push(scriptPublish);
                    var result = await WWW.rpc_invokeScript(postArray);

                    var consume = result["gas_consumed"];
                    var gas_consumed = parseInt(consume);

                    var extdata = new ThinNeo.InvokeTransData();
                    extdata.script = sb.ToArray();
                    extdata.gas = Neo.Fixed8.Zero;

                    var tran = WWW.makeTran(ThinNeo.Helper.GetAddressFromPublicKey(pkey));
                    tran.extdata = extdata;

                    var msg = tran.GetMessage();
                    var signdata = ThinNeo.Helper.Sign(msg, this.main.panelLoadKey.prikey);
                    tran.AddWitness(signdata, pkey, ThinNeo.Helper.GetAddressFromPublicKey(pkey));
                    var data = tran.GetRawData();
                    var rawdata = data.toHexString();

                    var postRawArray = [];
                    postRawArray.push(this.main.panelState.chainHash);
                    postRawArray.push(rawdata);
                    var postResult = await WWW.rpc_sendrawtransaction(postRawArray);
                    alert(JSON.stringify(postResult));
                }                
                lightsPanel.QuickDom.addElement(this.panel, "br");
                btn.textContent = "send";
                this.panel.divContent.appendChild(btn);
            }   
            file.onchange = (ev: Event) =>
            {
                if (file.files[0].name.includes(".avm"))
                {
                    reader.readAsArrayBuffer(file.files[0]);
                }
            }      
        }
    }

}