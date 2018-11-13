namespace what
{

    export class panel_State
    {
        constructor()
        {

        }
        panel: lightsPanel.panel;
        main: Main;

        spanAPIHeight: HTMLSpanElement;
        spanRPC: HTMLSpanElement;
        spanRPCHeight: HTMLSpanElement;

        select:HTMLSelectElement;
        chainHash:string;
        selectIndex:number;
        init(main: Main): void
        {
            this.main = main;
            this.panel = lightsPanel.panelMgr.instance().createPanel("API States(Refresh per 1 sec)");

            this.panel.divRoot.style.left = "30px";
            this.panel.divRoot.style.top = "30px";
            this.panel.floatWidth = 300;
            this.panel.floatHeight = 150;
            this.panel.canDrag = true;
            this.panel.canScale = true;

            this.panel.onFloat();
            this.panel.divContent.textContent = "";
            lightsPanel.QuickDom.addSpan(this.panel, "API=" + WWW.api);
            lightsPanel.QuickDom.addElement(this.panel, "br");

            this.initAppChain();

            this.spanAPIHeight = lightsPanel.QuickDom.addSpan(this.panel, "");
            lightsPanel.QuickDom.addElement(this.panel, "br");

            //this.spanRPC = lightsPanel.QuickDom.addSpan(this.panel, "");
            //lightsPanel.QuickDom.addElement(this.panel, "br");

            //this.spanRPCHeight = lightsPanel.QuickDom.addSpan(this.panel, "");
            //lightsPanel.QuickDom.addElement(this.panel, "br");
            
        }
        async update(): Promise<void>
        {                
            if (this.chainHash){
                var height = await WWW.api_getHeight(this.chainHash);
                this.spanAPIHeight.textContent = "API height=" + height;
            }else{
                this.chainHash = "0";
                var height = await WWW.api_getHeight(this.chainHash);
                this.spanAPIHeight.textContent = "API height=" + height;      
            }                

            if (height > WWW.blockHeight){
                WWW.blockHeight = height;
                AppChainTool.initAllAppChain();
                if (WWW.chainHashLength < AppChainTool.appChainLength){
                    WWW.chainHashLength = AppChainTool.appChainLength;
                    this.updateAppChain();
                }               
            }

            //if (WWW.rpc == "")
            //{
            //    WWW.rpc = await WWW.rpc_getURL();
            //}
            //this.spanRPC.textContent = "RPC=" + WWW.rpcName + ":" + WWW.rpc;
            //this.spanRPCHeight.textContent = "RPC height=" + await WWW.rpc_getHeight();

        }

        selectClear():void{
            if (this.select)
            while(this.select.childNodes.length > 0){                
                this.select.removeChild(this.select.options[0]);
                this.select.remove(0);   
                this.select.options[0] = null;            
            }
        }

        async updateAppChain(){
            this.selectClear();
            var name2Hash = await AppChainTool.initAllAppChain();
            for (var chainName in name2Hash){
                var sitem = document.createElement("option");
                sitem.text = chainName;
                sitem.value = name2Hash[chainName];
                this.select.appendChild(sitem);
            }
            this.select.selectedIndex = this.selectIndex;
        }

        async initAppChain(){  
            var name2Hash = await AppChainTool.initAllAppChain();        
            lightsPanel.QuickDom.addSpan(this.panel, "Chain Hash");
            this.select = document.createElement("select");
            this.panel.divContent.appendChild(this.select);
            for (var chainName in name2Hash){
                var sitem = document.createElement("option");
                sitem.text = chainName;
                sitem.value = name2Hash[chainName];
                this.select.appendChild(sitem);
            }
            this.select.onchange = (ev) =>{
                this.updateHeight();
            }
        }

        async updateHeight(){
            this.selectIndex = this.select.selectedIndex;
            this.chainHash = (this.select.childNodes[this.selectIndex] as HTMLOptionElement).value; 
            var height = await WWW.api_getHeight(this.chainHash);
            this.spanAPIHeight.textContent = "API height=" + height; 
        }
    }

}