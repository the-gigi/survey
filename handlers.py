
basic_actions = 'show hide load'.split()
def get_handler(container):
    handler = container['action']
    name = handler[:handler.find('(')]
    if name in basic_actions:
        return handler

    if name.startswith('displayDriversTable'):
        return "displayDriversTable($('#qdriver_count_select').val());"

    raise Exception('Unknown action: ' + name)