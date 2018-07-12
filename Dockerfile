FROM node
MAINTAINER Jeff Arn

# Clone application within image
RUN git clone https://github.com/Repjarms/film-buffs-quest.git /root/film-buffs-quest
RUN cd /root/film-buffs-quest; npm i; npm run build;
EXPOSE 3000
CMD cd /root/film-buffs-quest; npm run build && NODE_ENV=production node server.js
