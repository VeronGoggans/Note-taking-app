from datetime import date, datetime

class Calendar():    

    @staticmethod
    def date():
        """
        Get the current date formatted based on the specified region.
        """
        current_date = date.today()
        return current_date.strftime("%d/%m/%Y")
        
    
    @staticmethod
    def datetime(precise = False):
        """
        Get the current date and time formatted.
        """
        current_datetime = datetime.now()
        if precise:
            return current_datetime.strftime("%d/%m/%Y %H:%M:%S")
        return current_datetime.strftime("%d/%m/%Y %H:%M")