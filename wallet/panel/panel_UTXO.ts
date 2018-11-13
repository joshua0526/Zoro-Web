///<reference path="../../lib/neo-ts.d.ts"/>
namespace what
{

    export class panel_UTXO
    {
        constructor()
        {

        }
        panel: lightsPanel.panel;
        main: Main;
        spanBCPHeight:HTMLSpanElement;
        async init(main: Main)
        {
            this.main = main;
            this.panel = lightsPanel.panelMgr.instance().createPanel("BCP");

            this.panel.divRoot.style.left = "920px";
            this.panel.divRoot.style.top = "30px";
            this.panel.floatWidth = 400;
            this.panel.floatHeight = 150;
            this.panel.canDrag = true;
            this.panel.canScale = true;

            this.panel.onFloat();
            this.panel.divContent.textContent = "";

            this.spanBCPHeight = lightsPanel.QuickDom.addSpan(this.panel, "");
            lightsPanel.QuickDom.addElement(this.panel, "br");
        }

        async refresh()
        {
            var Nep5 = await WWW.rpc_getBalanceOf(this.main.panelState.chainHash, this.main.panelLoadKey.address);
            this.spanBCPHeight.textContent = "BCP=" + Nep5;
        }
    }
}