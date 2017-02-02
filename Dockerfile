FROM node:7.2.1
RUN npm install -q -g \
	yarn \
	pushstate-server
COPY ./package.json /packages/package.json
RUN cd /packages/ && \
	yarn install
COPY . /code/
RUN rm -rf /code/node_modules
RUN mv /packages/* /code/
WORKDIR /code/
EXPOSE 80

CMD yarn run build && pushstate-server ./build 80
