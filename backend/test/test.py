my_set = {

}

my_set.setdefault('path', '<h1>Hello cache</h1>')
print(my_set.get('path'))
my_set.update ({'path':'Stormy'})
print(my_set.get('path'))
