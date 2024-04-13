import os 
from src.backend.domain.enums.exportStatus import ExportStatus
from src.backend.presentation.request_bodies.note.export_note_request import ExportNoteRequest

class DocumentExporter:

    def export(self, export_request: ExportNoteRequest):
        if export_request.format == 'txt':
            return self.__export_txt_document(export_request)
        return self.__export_pdf_document(export_request)


    def __export_txt_document(self, export_request: ExportNoteRequest):
        """
        Export text document to a file in the user's Downloads folder.

        Args:
            title (str): The title of the text document. This will be used as the filename (without extension).
            content (str): The content of the text document to be written into the file.

        Returns:
            ExportStatus: An enum representing the status of the export operation.
                DOWNLOAD_SUCCESS if the export was successful.
                DOWNLOAD_FAILED if there was an issue creating or writing to the file.

        Raises:
            OSError: If there is an issue creating or writing to the file.

        Note:
            This method assumes that the 'downloads_folder' attribute has been properly set.
            It writes the provided content to a text file with the specified title in the user's Downloads folder.
            If a file with the same name already exists, it will be overwritten.
        """
        downloads_folder = os.path.join(os.path.expanduser('~'), 'Downloads')
        file_path = os.path.join(downloads_folder, f'{export_request.title}.txt')

        try:
            with open(file_path, 'w') as file:
                file.write(export_request.content)
                return ExportStatus.DOWNLOAD_SUCCESS
        except OSError as e:
            return ExportStatus.DOWNLOAD_FAILED
        

    def __export_pdf_document(self, export_request: ExportNoteRequest):
        return ExportStatus.DOWNLOAD_FAILED
    
