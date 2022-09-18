pip3 install BeautifulSoup4
mkdir logs
cd logs
wget http://www.cim.mcgill.ca/~dudek/206/Logs/AOL-user-ct-collection/user-ct-test-collection-02.txt.gz
gunzip user-ct-test-collection-02.txt.gz
rm -f user-ct-test-collection-02.txt.gz
mv user-ct-test-collection-02.txt data.txt
cd ..
python3 myversion.py
rm -rf logs