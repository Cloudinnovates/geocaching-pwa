export class FileUtil {

    public static changeSelectFile(event): FileReader {
        const fileUploaded: File = event.target.files[0];
        const myReader: FileReader = new FileReader();

        myReader.readAsDataURL(fileUploaded);

        return myReader;
    }

}
