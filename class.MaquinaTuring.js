class MaquinaTuring{
    constructor(nombreMT="MT"){
        this.nombre=nombreMT;
        this.estados=[];
        this.final=[];
        this.cinta="#";
        this.transicion=[];
        this.inicial="";
        this.cabezal=0;
        this.estados_finales=[];
    }

    fija_estado_inicial(estado_){
        this.inicial=estado_;
    }

    fija_estados(estadosSeparadosPorComa){
        this.estados=estadosSeparadosPorComa.split(",");
    }

    fija_estados_finales(estadosSeparadosPorComa){
        this.estados_finales=estadosSeparadosPorComa.split(",");
    }

    agrega_transicion(estado_,letra_,nuevoEstado_,escribe_,mueve_){
        //verifica estados
        if(!this.estados.includes(estado_)){
            console.log('Transicion mal formada, estado ${estado} no es permitido');
            return false;
        }
        //verifica movimiento
        if(mueve_!='I' && mueve_!='D'){
            console.log('Transicion mal formada, movimiento debe ser I o D');
            return false;
        }
        this.transicion.push(
            {   estado:estado_,
                letra:letra_,
                nuevoEstado:nuevoEstado_,
                escribe:escribe_,
                mueve:mueve_ });
        return true;
    }

    transicion_para(estado,letra){
        for(var k=0;k<this.transicion.length;k++){
            if( this.transicion[k].estado===estado &&
                this.transicion[k].letra===letra)
                return this.transicion[k];
        }
        return null;
    }

    procesaPalabra(palabra){
        this.cinta="#"+palabra+"#";
        this.cabezal=1;
        var pre,post,actual=1;
        var estado=this.inicial;
        var t=this.transicion_para(estado,this.cinta.charAt(this.cabezal));
        while(t!=null){
            console.log(estado+' :'+this.cinta);
            pre=this.cinta.substr(0,this.cabezal);
            post=this.cinta.substr(this.cabezal+1);
            this.cinta=pre+t.escribe+post;
            this.mueve(t.mueve);
            estado=t.nuevoEstado;
            t=this.transicion_para(estado,this.cinta.charAt(this.cabezal));
        }
        console.log(estado+' :'+this.cinta);
        return this.estados_finales.includes(estado);
    }

    mueve(I_o_D){
        if(I_o_D=='I' && this.cabezal>0){
            this.cabezal--;
        }else if(I_o_D=='D' && this.cabezal<this.cinta.length){
            this.cabezal++;
        }else if(I_o_D=='I'){
            this.cinta='#'+this.cinta;
        }else{
            this.cinta+='#';
            this.cabezal++;
        }
    }
}