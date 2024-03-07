from datetime import date, datetime


class DateService():
    def __init__(self) -> None:
        pass


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
        

    @staticmethod
    def date_diff(date1: str, date2: str, region='EU'):
        """
        Calculate the difference in days between two dates based on the specified region.

        Args:
            date1 (str): The first date in string format.
            date2 (str): The second date in string format.
            region (str, optional): The region for date formatting. Defaults to 'EU'.
                - 'EU': European date format (dd/mm/yyyy).
                - 'US': American date format (mm/dd/yyyy).

        Returns:
            Union[timedelta, str]: 
            - If successful, it returns the timedelta representing the difference in days between the two dates.
            - If an invalid region is provided, it returns a message indicating to use 'EU' or 'US'.
            - If a ValueError occurs, it returns a message indicating that the time component was found, suggesting the use of `time_diff`.
        """
        eu_date_format = '%d/%m/%Y'
        us_date_format = '%m/%d/%Y'
        try:
            if region.upper() == 'EU':
                return datetime.strptime(date1, eu_date_format).date() - datetime.strptime(date2, eu_date_format).date()
            if region.upper() == 'US':
                return datetime.strptime(date1, us_date_format).date() - datetime.strptime(date2, us_date_format).date()
            else:
                return 'For the region use EU or US.'
        except ValueError:
            time = date1.split(' ')[-1]
            return f"ValueError: Remaining date part {time}. Did you meant to use time_diff()"
    

    @staticmethod
    def time_diff(date1: str, date2: str, region='EU'):
        """
        Calculate the difference in time between two datetime values based on the specified region.

        Args:
            date1 (str): The first datetime value in string format.
            date2 (str): The second datetime value in string format.
            region (str, optional): The region for date and time formatting. Defaults to 'EU'.
                - 'EU': European date and time format (dd/mm/yyyy HH:MM:SS).
                - 'US': American date and time format (mm/dd/yyyy HH:MM:SS).

        Returns:
            Union[timedelta, str]: 
            - If successful, it returns the timedelta representing the difference in time between the two datetime values.
            - If an invalid region is provided, it returns a message indicating to use 'EU' or 'US'.
            - If a ValueError occurs, it returns a message indicating that the date component was missing.
        """
        eu_date_format = '%d/%m/%Y %H:%M:%S'
        us_date_format = '%m/%d/%Y %H:%M:%S'

        try:
            if region.upper() == 'EU':
                return datetime.strptime(date1, eu_date_format) - datetime.strptime(date2, eu_date_format)
            if region.upper() == 'US':
                return datetime.strptime(date1, us_date_format) - datetime.strptime(date2, us_date_format)
            else:
                return 'For the region use EU or US.'
        except ValueError:
            return 'ValueError: Missing date part %H:%M:%S.'