
colors=["#75b9be","#696d7d","#d72638","#f49d37","#b4f3ed","#ebc560","#6ebdbf","#d6b775","#119190","#cee55e","#e9bda2","#fcb79f"]
colorss=["#f66e7c", "#edbfb2", "#bbf0e3", "#7ed3c0", "#F2E6D8", "#f6d293"]

class Grid {
  /////////////////////////////////
  constructor(_w, _h) {
    this.gridWidth = _w;
    this.gridHeight = _h;
    this.noteSize = 50;
    this.notePos = [];
    this.noteState = [];
    // this.activatedNotes = 0;

    // initalise grid structure and state
    for (let x=0;x<_w;x+=this.noteSize){
      let posColumn = [];
      let stateColumn = [];
      
      for (let y=0;y<_h;y+=this.noteSize){
        posColumn.push(createVector(x+this.noteSize/2,y+this.noteSize/2));
        stateColumn.push(0);
      }
      this.notePos.push(posColumn);
      this.noteState.push(stateColumn);
    }
  }
  /////////////////////////////////
  run(img) {
    img.loadPixels();//加载图像像素并寻找激活的方格，最后绘制激活的方格。
    this.findActiveNotes(img);
    this.drawActiveNotes(img);
  }
  
drawActiveNotes(img) {
  let activeNotes = 0;
  for (let i = 0; i < this.notePos.length; i++) {
    for (let j = 0; j < this.notePos[i].length; j++) {


      
      let x = this.notePos[i][j].x;
      let y = this.notePos[i][j].y;
      if (this.noteState[i][j] > 0) {
       // playNoteSound(j);
        //playNoteFrequency(j);
       

        // if (this.noteState[i][j] >5) {
        //   sound.play();
        // }
       activeNotes++;
        let alpha = this.noteState[i][j] * 200;
        // color1= color(random(colors),alpha);
        // col= color(random(colorss),alpha);
       //let c1 = color(255, 0, random(255), alpha);
       let c1 =color(235, random(30,215), 96,alpha);
      //let c2 = color(0, 255, 0, alpha);
      let c2 =color(random(50, 255), 171, random(255), alpha);
      let mix = lerpColor(c1, c2, map(i, 0, this.notePos.length, 0, 1));

      
       let s = this.noteState[i][j];
        let rotation = map(this.noteState[i][j], 0, 1, 0, PI);
        // Modify the y position based on noteState
        let yOffset = map(s, 0, 1, 0, 50);
        let newY = y - yOffset;

        push();
        noStroke()
        translate(x, newY);
       fill(mix);
      
        rotate(rotation);
        ellipse(-this.noteSize * s / 2, -this.noteSize * s / 2 - 9.5, 15, 15);
        ellipse(-this.noteSize * s / 2 - 8.5, -this.noteSize * s / 2 - 3, 15, 15);
        ellipse(-this.noteSize * s / 2 + 8.5, -this.noteSize * s / 2 - 3, 15, 15);
        ellipse(-this.noteSize * s / 2 + 5.5, -this.noteSize * s / 2 + 8, 15, 15);
        ellipse(-this.noteSize * s / 2 - 5.5, -this.noteSize * s / 2 + 8, 15, 15);
        ellipse(-this.noteSize * s / 2, -this.noteSize * s / 2, 15, 15);
        pop();
      }
      this.noteState[i][j] -= 0.05;
      this.noteState[i][j] = constrain(this.noteState[i][j], 0, 1);
    }
  }
  if (activeNotes >= 20) {
    sound.play();
  }

}


  /////////////////////////////////
  findActiveNotes(img){
    for (let x = 0; x < img.width; x += 1) {
        for (let y = 0; y < img.height; y += 1) {
            let index = (x + (y * img.width)) * 4;
            let state = img.pixels[index + 0];
            if (state==0){ // if pixel is black (ie there is movement)
              // find which note to activate
              let screenX = map(x, 0, img.width, 0, this.gridWidth);
              let screenY = map(y, 0, img.height, 0, this.gridHeight);
              let i = int(screenX/this.noteSize);
              let j = int(screenY/this.noteSize);
              this.noteState[i][j] = 1;
            }
        }
    }
  }
}
