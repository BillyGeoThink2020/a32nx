var A320_Neo_BAT;
(function (A320_Neo_BAT) {
    class Display extends BaseAirliners {
        constructor() {
            super();
            this.batTexts = new Array(null, null);
            this.batValues = new Array(0, 0);
            this.updateThrottler = new UpdateThrottler(500);
        }
        get templateID() {
            return "A320_Neo_BAT";
        }
        connectedCallback() {
            super.connectedCallback();
            this.batTexts[0] = this.querySelector("#BAT1");
            this.batTexts[1] = this.querySelector("#BAT2");
        }
        onUpdate(_deltaTime) {
            super.onUpdate(_deltaTime);
            if (this.updateThrottler.canUpdate(_deltaTime) === -1) {
                return;
            }
            const lightsTest = SimVar.GetSimVarValue("L:XMLVAR_LTS_Test", "Bool");
            this.lightsTest = lightsTest;

            if (lightsTest) {
                for (let i = 0; i < 2; ++i) {
                    this.batTexts[i].textContent = "88.8V";
                }
            } else {
                for (let i = 0; i < 2; ++i) {
                    const batValue = SimVar.GetSimVarValue(`L:A32NX_ELEC_BAT_${i + 10}_POTENTIAL`, "Volts");
                    this.batValues[i] = batValue;
                    this.batTexts[i].textContent = this.batValues[i].toFixed(1) + "V";
                }
            }
        }
    }
    A320_Neo_BAT.Display = Display;
})(A320_Neo_BAT || (A320_Neo_BAT = {}));
registerInstrument("a320-neo-bat", A320_Neo_BAT.Display);
