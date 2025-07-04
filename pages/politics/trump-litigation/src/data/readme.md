# Trump litigation tracker data

The CSV is the source of truth for this folder, coming from the proprietary and annoying xlsm format of Excel. csv2json.py does the heavy lifting and then I do some manual cleanup via find and replace:

- `citation` prop key shouldn't have weird Unicode in it
- don't need that extra `"": ""` prop in each object
