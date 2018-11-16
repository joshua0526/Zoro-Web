namespace what
{
    export class AppChainTool
    {
        static chainName2Hash: { [id: string]: string } = {};
        static appChainLength:number = 1;
        static async initAllAppChain(){
            var allChainHash = await WWW.api_getAllAppChain();
            this.chainName2Hash["AppRoot"] = "0000000000000000000000000000000000000000";
            this.appChainLength = 1; 
            for (var a in allChainHash){
                var chainHash = allChainHash[a];
                var chainName = await WWW.api_getAppChainName(chainHash);
                this.chainName2Hash[chainName] = chainHash;
                this.appChainLength++;
            }  
            return this.chainName2Hash;          
        }

        static pubKey_List:{[id:string]:string} = {};
        static ip_List:{[id:string]:string} = {};

        static initAppChainSelectList(){
            for (var i = 0; i < 9; i++){
                this.pubKey_List["pubKey" + (i + 1)] = this.Node_List["node" + (i + 1)]["pubkey"];
                this.ip_List["ip" + (i + 1)] = this.Node_List["node" + (i + 1)]["ip"];
            }         
        }

        static Node_List = {
            "node1": {
              "ip": "182.254.221.14",
              "wallet": "1.json",
              "address": "AbE6cCQGstikD1QvwTnkrD3Jid6JGPY4oq",
              "pubkey": "025178aa02ccb9a30c74c0e9771ed60d771710625e41d1ae37a192a6db2c00e7d6"
            },
            "node2": {
              "ip": "123.207.183.55",
              "wallet": "2.json",
              "address": "ANULCFJSek2qmaomk3x9KD4zR89rftsTKU",
              "pubkey": "02ade1a21bd7d90b88299e7e1fef91c12fdc9988ad9100816d3b50cb6090fd88a2"
            },
            "node3": {
              "ip": "182.254.219.170",
              "wallet": "3.json",
              "address": "ASzuDdnb2Uzkk7XoXxsJ52Wx22er6VXWYt",
              "pubkey": "02f0a7538d3aa6fc6a91315c5842733820df5b4ec1e4f273adc5d36eebd0f7463a"
            },
            "node4": {
              "ip": "115.159.68.43",
              "wallet": "4.json",
              "address": "AXBnQ5itNMYnNTW6YNvfR668AeYZ893hDR",
              "pubkey": "03f35c16c5e8837697b9263f44f62be58c058562e76b033ed29a2223792901f6b1"
            },
            "node5": {
              "ip": "115.159.53.39",
              "wallet": "5.json",
              "address": "AeTshMKrTFtmowwtHH2Da4bW19HbASmyQN",
              "pubkey": "0394f2618478474d3d5744ddd0628cf22fff4deaed4264f468f55a34758a64ac72"
            },
            "node6": {
              "ip": "115.159.85.92",
              "wallet": "6.json",
              "address": "AG6AMhWAPNk9ZAzRccb4ca1z9PmNz6JpnC",
              "pubkey": "03b7034750ff07afe1d122602fe1581672d3741bf4a729118e6fb3169237146120"
            },
            "node7": {
              "ip": "123.206.197.174",
              "wallet": "7.json",
              "address": "AWEyVxBus6NADVHpkABxoN9hyasmqLKpnt",
              "pubkey": "036fd67a326378779db32574c5610f9537411376834a1c9a50aaecae74f733b8ae"
            },
            "node8": {
              "ip": "115.159.161.150",
              "wallet": "8.json",
              "address": "AeFt22JgXDRyxuMR326xdH5FrGVNtN7ju9",
              "pubkey": "039ae33d9489d15936a9a4197d9ad029bc60469afd2482150af8ec7e7b3b81bfa1"
            },
            "node9": {
              "ip": "115.159.183.238",
              "wallet": "9.json",
              "address": "AUHxthEAYQG47E5TLBevDyhVaSkex7sQzR",
              "pubkey": "021421f6b70a410ff14521d699343f136fe58857fab45a0984bee8e73670fd2512"
            }          
          }
    }
}