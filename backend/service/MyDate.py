from datetime import date, datetime


class MyDate():
    def __init__(self) -> None:
        pass


    @staticmethod
    def date(region='EU'):
        current_date = date.today()

        if region.upper() == 'EU':
            return current_date.strftime("%d/%m/%Y")
        if region.upper() == 'US':
            return current_date.strftime("%m/%d/%Y")
        else:
            return 'Use EU or US for this method'
        
    
    @staticmethod
    def datetime(region='EU'):
        current_datetime = datetime.now()

        if region.upper() == 'EU':
            return current_datetime.strftime("%d/%m/%Y %H:%M:%S")
        if region.upper() == 'US':
            return current_datetime.strftime("%m/%d/%Y %H:%M:%S")
        else:
            return 'Use EU or US for this method.'
        

    @staticmethod
    def date_diff(date1: str, date2: str, region='EU'):
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