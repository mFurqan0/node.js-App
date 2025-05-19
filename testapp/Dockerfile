FROM node

ENV MONGO_DB_UsERNAME=admin
ENV MONGO_DB_PASSWORD=qwerty

RUN mkdir -p testapp 

COPY . /testapp 

CMD ["node", "/testapp/server.js"]