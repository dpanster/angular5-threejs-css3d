import { Img3D } from "../src/Img3D";

fdescribe('Img3D Class Test', () => {
  let cwbGl: Img3D;

  it('should create Instance', () => {
    var t :HTMLDivElement;
    cwbGl = new Img3D(t,2); 
    expect(cwbGl).toBeTruthy();
  });

  it('Get Class Name', () => {
    expect(cwbGl.getClassName()).toBe("TestClassName");  
  });
});
  