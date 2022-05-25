export default {
    _apiUrl: "http://ws.audioscrobbler.com/2.0/",
    _apiKey: "942509cc0d5a8a47d78dcfbb731f2c3a",
    _apiFormat: "json",

    //Результат запроса
    async getResources(params) {

        const qs = this._convertToString({
            ...params,
            api_key: this._apiKey,
            format: this._apiFormat,
        });


        const res = await fetch(`${this._apiUrl}?${qs}`);

        if (!res.ok) {
            throw new Error(`Could not fetch, status ${res.status}`);
        }

        return res.json();

    },

    // Запрос получения информации о ипсолнителе
    async getArtistInfo(artist) {

        const params = {
            method: 'artist.getinfo',
            artist,
            autocorrect: 1,
            lang: 'en',
        }

        const data = await this.getResources(params);

        return this._transformArtistInfo(data.artist);
    },
    //Запрос получения информации о треке
    async getTrackInfo(track, artist) {

        const params = {
            method: 'track.getInfo',
            track,
            artist,
        }

        const data = await this.getResources(params);

        return data;
    },
    //Запрос получения топа исполнителей
    async getTopArtists() {

        const params = {
            method: 'chart.getTopArtists',
            page: 1,
            limit: 6,
        }

        const data = await this.getResources(params);

        return this._transformTopArtists(data.artists.artist);
    },
    //Запрос получения топа треков
    async getTopTracks() {

        const params = {
            method: 'chart.getTopTracks',
            page: 1,
            limit: 6,
        }

        const data = await this.getResources(params);

        return this._transformTopTracks(data.tracks.track);
    },
    //Запрос полкчения топа тэгов
    async getTopTags() {
        const params = {
            method: 'chart.getTopTags',
            page: 1,
            limit: 3,
        }

        const data = await this.getResources(params);

        return this._transformTopTags(data.tags.tag);
    },
    //ЗАпрос получения топа артистов по данному тену
    async getTopArtistByTag(tag) {

        const params = {
            method: 'tag.getTopArtists',
            tag,
            page: 1,
            limit: 6
        }

        const data = await this.getResources(params);

        return this._transformTopArtists(data.topartists.artist);
    },

    //Запрос поиска трека
    async searchTrack(track) {
        const param = {
            method: 'track.search',
            limit: 30,
            track,
        }

        const data = await this.getResources(param)

        return this._transformTrackSearch(data.results.trackmatches.track);
    },

    //Изменение массива с тегами
    _transformTopTags(tags) {
        return tags.map(tag => ({
            name: tag.name,
            url: tag.url,
        }))
    },

    //Изменение массива с трками для топа
    _transformTopTracks(tracks) {
        return tracks.map(track => ({
            name: track.name + ' - ' + track.artist.name,
            url: track.url,
            image: track.image[3]['#text'],
        }))
    },

    //Изменение информации о артисте
    _transformArtistInfo(artist) {
        return {
            name: artist.name,
            url: artist.url,
            image: artist.image[2]["#text"],
        }
    },

    //Изменение массива с треками
    _transformTrackSearch(tracks) {
        return tracks.map(track => ({
            name: track.name,
            artist: track.artist,
            url: track.url,
            image: track.image[2]["#text"],
            listeners: track.listeners,
        }))
    },

    //Изменение топа артистов
    _transformTopArtists(artists) {
        return artists.map(artist => ({
            name: artist.name,
            url: artist.url,
            image: artist.image[3]['#text'],
        }))
    },


    //Преобразование параметров метода в строку для запроса
    _convertToString(params) {
        return Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
    }
};