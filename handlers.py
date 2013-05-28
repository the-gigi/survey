import operator

basic_actions = 'show hide load'.split()
def get_handler(container):
    handler = container['action']
    name = handler[:handler.find('(')]
    if name in basic_actions:
        return handler

    if name.startswith('displayDriversTable'):
        return "displayDriversTable($('#qdriver_count_select').val());"

    raise Exception('Unknown action: ' + name)


def get_create_map_handler(id, map_options):
    # combine list of dicts to a single dict
    map_options= dict(reduce(operator.add, [o.items() for o in map_options]))
    print '**** map options:', map_options
    handler = 'createMap(%s, %s, {})' % (id, map_options)
    print '**** handler:', handler
    return handler