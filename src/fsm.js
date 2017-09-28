class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config=config;
        this.mas=[];
        this.instance=config.initial;
        this.prev=[];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.instance;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        var bp=false;
        for (var key in this.config.states) {
            if (state===key) bp=true;
        }
        if (!bp) throwError();
        this.mas.push(this.instance);
        this.instance = state;
        this.prev=[];

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.mas.push(this.instance);
        var bp=false;
        for(var k in this.config.states[this.instance].transitions){
            if (event===k) {this.instance=this.config.states[this.instance].transitions[k]; bp=true;}
        }
        if (!bp) throwError();
        this.prev=[];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.instance=this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arr = [];
        if (!event) {
            for(var i in this.config.states) {
                arr.push(i);
            }
            return arr;
        }
        for(i in this.config.states){
            for(var j in this.config.states[i].transitions){
                if (j===event) {arr.push(i);}
            }
        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.mas[0]) {//если есть куда откатывать
            this.prev.push(this.instance);
            this.instance = this.mas.pop();
            return true;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.prev[0]) {//если есть куда откатывать
            this.mas.push(this.instance);
            this.instance=this.prev.pop();
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.mas=[];
        this.prev=[];
        this.instance='';
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
