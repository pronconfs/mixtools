1. Gerar txt com elementos a procurar: 

grep --color=always -E 'Voice->getCallLog.+"callId":"Possible bad logging' log_201*  | awk '{match($1,/:\[(.*)\ /,date)} {match($8,/"domain":"(.+)","callUuid"/,d)}{match($8,/"callUuid":"(.+)","callId"/,c)} {print substr($1,length($1)-9,length($1)),substr($2, 1, length($2)-1),"domain:" d[1],"callUuid:" c[1]}' | sort | uniq > baseData.txt

2. executar:

node getBaseDataSerial.js
