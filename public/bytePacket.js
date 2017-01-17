 class bytePacket {

     constructor(pbuffer = null) {
         if(pbuffer == null)
         {
            this.packet = new Uint8Array(0);
         }
         else{
             this.packet = new Uint8Array(pbuffer);
         }
     }

     readBytes(byteLength)
     {
         var returnArray = this.packet.subarray(0,byteLength).slice(0);
         this.packet = this.packet.slice(byteLength,this.packet.length);
         return this._concatTypedArrays(returnArray, new Int8Array(byteLength)).buffer;
     }

     _concatTypedArrays(a, b) { // a, b TypedArray of same type
         var c = new(a.constructor)(a.length + b.length);
         c.set(a, 0);
         c.set(b, a.length);
         return c;
     }

     addBuffers(a) {
         this.packet = this._concatTypedArrays(
             this.packet,
             new Uint8Array(a.buffer)
         );
     }
     addSingleBuffer(buffertype,v)
     {
         buffertype[0] = v;
         this.addBuffers(buffertype);
     }

     addInt8(v) { this.addSingleBuffer(new Int8Array(1),v); }
     addInt16(v) { this.addSingleBuffer(new Int16Array(1),v); }
     addInt32(v) { this.addSingleBuffer(new Int32Array(1),v); }
     addUInt8(v) { this.addSingleBuffer(new Uint8Array(1),v); }
     addUInt16(v) { this.addSingleBuffer(new UInt16Array(1),v); }
     addUInt32(v) { this.addSingleBuffer(new UInt32Array(1),v); }
     addFloat32(v) { this.addSingleBuffer(new Float32Array(1),v); }
     addFloat64(v) { this.addSingleBuffer(new Float64Array(1),v); }
     addString(v, vLength)
     {

         var buffa = new Int8Array(vLength);
        for(var i=0; i < vLength; i++)
        {
            if(i < v.length)
            {
               buffa[i] = v.charCodeAt(i);
            }
            else{
                buffa[i] = 32; //Space
            }
        }
        this.addBuffers(buffa);
     }

     readInt8(){ return new Int8Array(this.readBytes(1))[0]; }
     readInt16(){ return new Int16Array(this.readBytes(2))[0]; }
     readInt32(){ return new Int32Array(this.readBytes(4))[0]; }
     readUInt8(){ return new UInt8Array(this.readBytes(1))[0]; }
     readUInt16(){ return new UInt16Array(this.readBytes(2))[0]; }
     readUInt32(){ return new UInt32Array(this.readBytes(4))[0]; }
     readFloat32(){ return new Float32Array(this.readBytes(4))[0]; }
     readFloat64(){ return new Float64Array(this.readBytes(8))[0]; }
     readString(vLength)
     {
         var vString = "";
         var stringBytes = new Uint8Array(this.readBytes(vLength));
         for (var i=0; i<vLength; i++) {
            var char1 = String.fromCharCode(stringBytes[i]);    
            if(char1 != "")
            {
                vString += char1;
            }
         }
         return vString;
     }
 }