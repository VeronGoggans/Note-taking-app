from datetime import date, datetime

class Calendar():

    @staticmethod
    def date(region='EU'):
        """
        Get the current date formatted based on the specified region.

        Args:
            region (str, optional): The region for date formatting. Defaults to 'EU'.
                - 'EU': European date format (dd/mm/yyyy).
                - 'US': American date format (mm/dd/yyyy).

        Returns:
            Union[str, Status]: 
            - If successful, it returns the current date formatted based on the specified region.
            - If an invalid region is provided, it returns a message indicating to use 'EU' or 'US'.
        """
        current_date = date.today()

        if region.upper() == 'EU':
            return current_date.strftime("%d/%m/%Y")
        if region.upper() == 'US':
            return current_date.strftime("%m/%d/%Y")
        else:
            return 'Use EU or US for this method'
        
    
    @staticmethod
    def datetime(region='EU'):
        """
        Get the current date and time formatted based on the specified region.

        Args:
            region (str, optional): The region for date and time formatting. Defaults to 'EU'.
                - 'EU': European date and time format (dd/mm/yyyy HH:MM).
                - 'US': American date and time format (mm/dd/yyyy HH:MM).

        Returns:
            Union[str, Status]: 
            - If successful, it returns the current date and time formatted based on the specified region.
            - If an invalid region is provided, it returns a message indicating to use 'EU' or 'US'.
        """
        current_datetime = datetime.now()

        if region.upper() == 'EU':
            return current_datetime.strftime("%d/%m/%Y %H:%M")
        if region.upper() == 'US':
            return current_datetime.strftime("%m/%d/%Y %H:%M")
        else:
            return 'Use EU or US for this method.'