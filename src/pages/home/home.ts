
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
 
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  alertCtrl: any;
  letterObj = {
    to: '',
    from: '',
    text: ''
  }
 
  pdfObj = null;
 
  constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener) { }
 
  createPdf() {
    var docDefinition = {
      content: [

        { text: 'Serviços de Alvenaria', style: 'header',alignment: 'center' },
 
        { text: 'Pedreiro', style: 'subheader' },
        { text: this.letterObj.from },

        { text: 'Cliente', style: 'subheader' },
        this.letterObj.to,

        { text: 'Preço por Metro Quadrado (Levantar a Casa)', style: 'subheader' },
        { text: this.letterObj.from },

        { text: 'Preço Total por Metro Quadrado (Levantar a Casa)', style: 'subheader' },
        { text: this.letterObj.from },

        { text: 'Preço por Metro Quadrado (Levanta,bate laje)', style: 'subheader' },
        { text: this.letterObj.from },

        { text: 'Preço Total por Metro Quadrado (Levanta,bate laje)', style: 'subheader' },
        { text: this.letterObj.from },

        { text: 'Preço do dia de Serviço', style: 'subheader' },
        { text: this.letterObj.from },
 

 
        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
 
  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBlob(buffer => {
        this.file.resolveDirectoryUrl(this.file.externalRootDirectory)
         .then(dirEntry => {
            this.file.getFile(dirEntry, 'test1.pdf', { create: true })
              .then(fileEntry => {
                fileEntry.createWriter(writer => {
                  writer.onwrite = () => {
                    this.fileOpener.open(fileEntry.toURL(), 'application/pdf')
                      .then(res => { })
                      .catch(err => {
                        const alert = this.alertCtrl.create({ message: 
      err.message, buttons: ['Ok'] });
                        alert.present();
                      });
                  }
                  writer.write(buffer);
                })
              })
              .catch(err => {
                const alert = this.alertCtrl.create({ message: err, buttons: ['Ok'] });
                alert.present();
              });
          })
          .catch(err => {
            const alert = this.alertCtrl.create({ message: err, buttons: ['Ok'] 
      });
            alert.present();
          });
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  } 
}