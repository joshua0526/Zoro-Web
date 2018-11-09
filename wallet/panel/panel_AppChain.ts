///<reference path="../../lib/neo-ts.d.ts"/>
namespace what
{
    export class panel_AppChain
    {
        constructor()
        {

        }
        panel: lightsPanel.panel;
        main:Main;
        init(main:Main):void
        {
            this.main = main;
            this.panel = lightsPanel.panelMgr.instance().createPanel("AppChain");
            
            this.panel.divRoot.style.left = "30px";
            this.panel.divRoot.style.top = "600px";
            this.panel.floatWidth = 300;
            this.panel.floatHeight = 350;
            this.panel.canDrag = true;
            this.panel.canScale = true;

            this.panel.onFloat();
            this.panel.divContent.textContent = "";

        
        }

        initAppChain():void{
            lightsPanel.QuickDom.addSpan(this.panel, "Chain Hash");
            var select = document.createElement("select");
            this.panel.divContent.appendChild(select);
        }
    }
}