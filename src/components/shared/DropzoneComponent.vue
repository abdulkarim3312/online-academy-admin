<template>
<div :id="id" ref="dropzoneElement" :class="{ 'vue-dropzone dropzone': includeStyling }">
    <div v-if="useCustomSlot" class="dz-message">
        <slot>업로드할 파일을 여기에 드롭하세요.</slot>
    </div>
</div>
</template>

<script>
import Dropzone from 'dropzone';

Dropzone.autoDiscover = false;

export default {
    props: {
        id: {
            type: String,
            required: true,
            default: "dropzone"
        },
        options: {
            type: Object,
            required: true
        },
        includeStyling: {
            type: Boolean,
            default: true,
            required: false
        },
        destroyDropzone: {
            type: Boolean,
            default: true,
            required: false
        },
        duplicateCheck: {
            type: Boolean,
            default: false,
            required: false
        },
        useCustomSlot: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    data() {
        return {
            wasQueueAutoProcess: true
        };
    },
    computed: {
        dropzoneSettings() {
            let defaultValues = {
                thumbnailWidth: 200,
                thumbnailHeight: 200
            };
            Object.keys(this.options).forEach(function (key) {
                defaultValues[key] = this.options[key];
            }, this);
            return defaultValues;
        }
    },
    mounted() {
        if (this.$isServer && this.hasBeenMounted) {
            return;
        }
        this.hasBeenMounted = true;

        this.dropzone = new Dropzone(
            this.$refs.dropzoneElement,
            this.dropzoneSettings
        );
        let vm = this;

        this.dropzone.on("thumbnail", function (file, dataUrl) {
            vm.$emit("vdropzone-thumbnail", file, dataUrl);
        });

        this.dropzone.on("addedfile", function (file) {
            //   var isDuplicate = false;
            if (vm.duplicateCheck) {
                if (this.files.length) {
                    var _i, _len;
                    for (
                        _i = 0, _len = this.files.length; _i < _len - 1; _i++ // -1 to exclude current file
                    ) {
                        if (
                            this.files[_i].name === file.name &&
                            this.files[_i].size === file.size &&
                            this.files[_i].lastModifiedDate.toString() ===
                            file.lastModifiedDate.toString()
                        ) {
                            this.removeFile(file);
                            //   isDuplicate = true;
                            vm.$emit("vdropzone-duplicate-file", file);
                        }
                    }
                }
            }

            vm.$emit("vdropzone-file-added", file);
        });

        this.dropzone.on("addedfiles", function (files) {
            vm.$emit("vdropzone-files-added", files);
        });

        this.dropzone.on("removedfile", function (file) {
            vm.$emit("vdropzone-removed-file", file);
            if (file.manuallyAdded && vm.dropzone.options.maxFiles !== null)
                vm.dropzone.options.maxFiles++;
        });

        this.dropzone.on("success", function (file, response) {
            vm.$emit("vdropzone-success", file, response);
        });

        this.dropzone.on("successmultiple", function (file, response) {
            vm.$emit("vdropzone-success-multiple", file, response);
        });

        this.dropzone.on("error", function (file, message, xhr) {
            vm.$emit("vdropzone-error", file, message, xhr);
        });

        this.dropzone.on("errormultiple", function (files, message, xhr) {
            vm.$emit("vdropzone-error-multiple", files, message, xhr);
        });

        this.dropzone.on("sending", function (file, xhr, formData) {
            vm.$emit("vdropzone-sending", file, xhr, formData);
        });

        this.dropzone.on("sendingmultiple", function (file, xhr, formData) {
            vm.$emit("vdropzone-sending-multiple", file, xhr, formData);
        });

        this.dropzone.on("complete", function (file) {
            vm.$emit("vdropzone-complete", file);
        });

        this.dropzone.on("completemultiple", function (files) {
            vm.$emit("vdropzone-complete-multiple", files);
        });

        this.dropzone.on("canceled", function (file) {
            vm.$emit("vdropzone-canceled", file);
        });

        this.dropzone.on("canceledmultiple", function (files) {
            vm.$emit("vdropzone-canceled-multiple", files);
        });

        this.dropzone.on("maxfilesreached", function (files) {
            vm.$emit("vdropzone-max-files-reached", files);
        });

        this.dropzone.on("maxfilesexceeded", function (file) {
            vm.$emit("vdropzone-max-files-exceeded", file);
        });

        this.dropzone.on("processing", function (file) {
            vm.$emit("vdropzone-processing", file);
        });

        this.dropzone.on("processingmultiple", function (files) {
            vm.$emit("vdropzone-processing-multiple", files);
        });

        this.dropzone.on("uploadprogress", function (file, progress, bytesSent) {
            vm.$emit("vdropzone-upload-progress", file, progress, bytesSent);
        });

        this.dropzone.on("totaluploadprogress", function (
            totaluploadprogress,
            totalBytes,
            totalBytesSent
        ) {
            vm.$emit(
                "vdropzone-total-upload-progress",
                totaluploadprogress,
                totalBytes,
                totalBytesSent
            );
        });

        this.dropzone.on("reset", function () {
            vm.$emit("vdropzone-reset");
        });

        this.dropzone.on("queuecomplete", function () {
            vm.$emit("vdropzone-queue-complete");
        });

        this.dropzone.on("drop", function (event) {
            vm.$emit("vdropzone-drop", event);
        });

        this.dropzone.on("dragstart", function (event) {
            vm.$emit("vdropzone-drag-start", event);
        });

        this.dropzone.on("dragend", function (event) {
            vm.$emit("vdropzone-drag-end", event);
        });

        this.dropzone.on("dragenter", function (event) {
            vm.$emit("vdropzone-drag-enter", event);
        });

        this.dropzone.on("dragover", function (event) {
            vm.$emit("vdropzone-drag-over", event);
        });

        this.dropzone.on("dragleave", function (event) {
            vm.$emit("vdropzone-drag-leave", event);
        });

        vm.$emit("vdropzone-mounted");
    },
    methods: {
        manuallyAddFile: function (file, fileUrl) {
            file.manuallyAdded = true;
            this.dropzone.emit("addedfile", file);
            let containsImageFileType = false;
            if (
                fileUrl.indexOf(".svg") > -1 ||
                fileUrl.indexOf(".png") > -1 ||
                fileUrl.indexOf(".jpg") > -1 ||
                fileUrl.indexOf(".jpeg") > -1 ||
                fileUrl.indexOf(".gif") > -1 ||
                fileUrl.indexOf(".webp") > -1
            )
                containsImageFileType = true;
            if (
                this.dropzone.options.createImageThumbnails &&
                containsImageFileType &&
                file.size <= this.dropzone.options.maxThumbnailFilesize * 1024 * 1024
            ) {
                fileUrl && this.dropzone.emit("thumbnail", file, fileUrl);

                var thumbnails = file.previewElement.querySelectorAll(
                    "[data-dz-thumbnail]"
                );
                for (var i = 0; i < thumbnails.length; i++) {
                    thumbnails[i].style.width =
                        this.dropzoneSettings.thumbnailWidth + "px";
                    thumbnails[i].style.height =
                        this.dropzoneSettings.thumbnailHeight + "px";
                    thumbnails[i].style["object-fit"] = "contain";
                }
            }
            this.dropzone.emit("complete", file);
            if (this.dropzone.options.maxFiles) this.dropzone.options.maxFiles--;
            this.dropzone.files.push(file);
            this.$emit("vdropzone-file-added-manually", file);
        },
        setOption: function (option, value) {
            this.dropzone.options[option] = value;
        },
        removeAllFiles: function (bool) {
            this.dropzone.removeAllFiles(bool);
        },
        processQueue: function () {
            let dropzoneEle = this.dropzone;
            this.dropzone.processQueue();
            this.dropzone.on("success", function () {
                dropzoneEle.options.autoProcessQueue = true;
            });
            this.dropzone.on("queuecomplete", function () {
                dropzoneEle.options.autoProcessQueue = false;
            });
        },
        init: function () {
            return this.dropzone.init();
        },
        destroy: function () {
            return this.dropzone.destroy();
        },
        updateTotalUploadProgress: function () {
            return this.dropzone.updateTotalUploadProgress();
        },
        getFallbackForm: function () {
            return this.dropzone.getFallbackForm();
        },
        getExistingFallback: function () {
            return this.dropzone.getExistingFallback();
        },
        setupEventListeners: function () {
            return this.dropzone.setupEventListeners();
        },
        removeEventListeners: function () {
            return this.dropzone.removeEventListeners();
        },
        disable: function () {
            return this.dropzone.disable();
        },
        enable: function () {
            return this.dropzone.enable();
        },
        filesize: function (size) {
            return this.dropzone.filesize(size);
        },
        accept: function (file, done) {
            return this.dropzone.accept(file, done);
        },
        addFile: function (file) {
            return this.dropzone.addFile(file);
        },
        removeFile: function (file) {
            this.dropzone.removeFile(file);
        },
        getAcceptedFiles: function () {
            return this.dropzone.getAcceptedFiles();
        },
        getRejectedFiles: function () {
            return this.dropzone.getRejectedFiles();
        },
        getFilesWithStatus: function () {
            return this.dropzone.getFilesWithStatus();
        },
        getQueuedFiles: function () {
            return this.dropzone.getQueuedFiles();
        },
        getUploadingFiles: function () {
            return this.dropzone.getUploadingFiles();
        },
        getAddedFiles: function () {
            return this.dropzone.getAddedFiles();
        },
        getActiveFiles: function () {
            return this.dropzone.getActiveFiles();
        }
    }
};
</script>

<style>
.vue-dropzone {
    border: 2px solid #e5e5e5;
    font-family: "Arial", sans-serif;
    letter-spacing: 0.2px;
    color: #777;
    transition: 0.2s linear;
}

.vue-dropzone:hover {
    background-color: #f6f6f6;
}

.vue-dropzone>i {
    color: #ccc;
}

.vue-dropzone>.dz-preview .dz-image {
    border-radius: 0;
    width: 100%;
    height: 100%;
}

.vue-dropzone>.dz-preview .dz-image img:not([src]) {
    width: 200px;
    height: 200px;
}

.vue-dropzone>.dz-preview .dz-image:hover img {
    transform: none;
    -webkit-filter: none;
}

.vue-dropzone>.dz-preview .dz-details {
    bottom: 0;
    top: 0;
    color: white;
    background-color: rgba(33, 150, 243, 0.8);
    transition: opacity 0.2s linear;
    text-align: left;
}

.vue-dropzone>.dz-preview .dz-details .dz-filename {
    overflow: hidden;
}

.vue-dropzone>.dz-preview .dz-details .dz-filename span,
.vue-dropzone>.dz-preview .dz-details .dz-size span {
    background-color: transparent;
}

.vue-dropzone>.dz-preview .dz-details .dz-filename:not(:hover) span {
    border: none;
}

.vue-dropzone>.dz-preview .dz-details .dz-filename:hover span {
    background-color: transparent;
    border: none;
}

.vue-dropzone>.dz-preview .dz-progress .dz-upload {
    background: #cccccc;
}

.vue-dropzone>.dz-preview .dz-remove {
    position: absolute;
    z-index: 30;
    color: white;
    margin-left: 15px;
    padding: 10px;
    top: inherit;
    bottom: 15px;
    border: 2px white solid;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 1.1px;
    opacity: 0;
}

.vue-dropzone>.dz-preview:hover .dz-remove {
    opacity: 1;
}

.vue-dropzone>.dz-preview .dz-success-mark,
.vue-dropzone>.dz-preview .dz-error-mark {
    margin-left: auto;
    margin-top: auto;
    width: 100%;
    top: 35%;
    left: 0;
}

.vue-dropzone>.dz-preview .dz-success-mark svg,
.vue-dropzone>.dz-preview .dz-error-mark svg {
    margin-left: auto;
    margin-right: auto;
}

.vue-dropzone>.dz-preview .dz-error-message {
    margin-left: auto;
    margin-right: auto;
    left: 0;
    width: 100%;
    text-align: center;
}

.vue-dropzone>.dz-preview .dz-error-message:after {
    display: none;
}

@-webkit-keyframes passing-through {
    0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        -moz-transform: translateY(40px);
        -ms-transform: translateY(40px);
        -o-transform: translateY(40px);
        transform: translateY(40px);
    }

    30%,
    70% {
        opacity: 1;
        -webkit-transform: translateY(0px);
        -moz-transform: translateY(0px);
        -ms-transform: translateY(0px);
        -o-transform: translateY(0px);
        transform: translateY(0px);
    }

    100% {
        opacity: 0;
        -webkit-transform: translateY(-40px);
        -moz-transform: translateY(-40px);
        -ms-transform: translateY(-40px);
        -o-transform: translateY(-40px);
        transform: translateY(-40px);
    }
}

@-moz-keyframes passing-through {
    0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        -moz-transform: translateY(40px);
        -ms-transform: translateY(40px);
        -o-transform: translateY(40px);
        transform: translateY(40px);
    }

    30%,
    70% {
        opacity: 1;
        -webkit-transform: translateY(0px);
        -moz-transform: translateY(0px);
        -ms-transform: translateY(0px);
        -o-transform: translateY(0px);
        transform: translateY(0px);
    }

    100% {
        opacity: 0;
        -webkit-transform: translateY(-40px);
        -moz-transform: translateY(-40px);
        -ms-transform: translateY(-40px);
        -o-transform: translateY(-40px);
        transform: translateY(-40px);
    }
}

@keyframes passing-through {
    0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        -moz-transform: translateY(40px);
        -ms-transform: translateY(40px);
        -o-transform: translateY(40px);
        transform: translateY(40px);
    }

    30%,
    70% {
        opacity: 1;
        -webkit-transform: translateY(0px);
        -moz-transform: translateY(0px);
        -ms-transform: translateY(0px);
        -o-transform: translateY(0px);
        transform: translateY(0px);
    }

    100% {
        opacity: 0;
        -webkit-transform: translateY(-40px);
        -moz-transform: translateY(-40px);
        -ms-transform: translateY(-40px);
        -o-transform: translateY(-40px);
        transform: translateY(-40px);
    }
}

@-webkit-keyframes slide-in {
    0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        -moz-transform: translateY(40px);
        -ms-transform: translateY(40px);
        -o-transform: translateY(40px);
        transform: translateY(40px);
    }

    30% {
        opacity: 1;
        -webkit-transform: translateY(0px);
        -moz-transform: translateY(0px);
        -ms-transform: translateY(0px);
        -o-transform: translateY(0px);
        transform: translateY(0px);
    }
}

@-moz-keyframes slide-in {
    0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        -moz-transform: translateY(40px);
        -ms-transform: translateY(40px);
        -o-transform: translateY(40px);
        transform: translateY(40px);
    }

    30% {
        opacity: 1;
        -webkit-transform: translateY(0px);
        -moz-transform: translateY(0px);
        -ms-transform: translateY(0px);
        -o-transform: translateY(0px);
        transform: translateY(0px);
    }
}

@keyframes slide-in {
    0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        -moz-transform: translateY(40px);
        -ms-transform: translateY(40px);
        -o-transform: translateY(40px);
        transform: translateY(40px);
    }

    30% {
        opacity: 1;
        -webkit-transform: translateY(0px);
        -moz-transform: translateY(0px);
        -ms-transform: translateY(0px);
        -o-transform: translateY(0px);
        transform: translateY(0px);
    }
}

@-webkit-keyframes pulse {
    0% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
    }

    10% {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
    }

    20% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
    }
}

@-moz-keyframes pulse {
    0% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
    }

    10% {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
    }

    20% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
    }
}

@keyframes pulse {
    0% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
    }

    10% {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
    }

    20% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
    }
}

.dropzone,
.dropzone * {
    box-sizing: border-box;
}

.dropzone {
    min-height: 150px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    background: white;
    padding: 20px 20px;
}

.dropzone.dz-clickable {
    cursor: pointer;
}

.dropzone.dz-clickable * {
    cursor: default;
}

.dropzone.dz-clickable .dz-message,
.dropzone.dz-clickable .dz-message * {
    cursor: pointer;
}

.dropzone.dz-started .dz-message {
    display: none;
}

.dropzone.dz-drag-hover {
    border-style: solid;
}

.dropzone.dz-drag-hover .dz-message {
    opacity: 0.5;
}

.dropzone .dz-message {
    text-align: center;
    margin: 2em 0;
}

.dropzone .dz-message .dz-button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}

.dropzone .dz-preview {
    position: relative;
    display: inline-block;
    vertical-align: top;
    margin: 16px;
    min-height: 100px;
    margin-right: 20px !important;
}

.dropzone .dz-preview:hover {
    z-index: 1000;
}

.dropzone .dz-preview:hover .dz-details {
    opacity: 1;
}

.dropzone .dz-preview.dz-file-preview .dz-image {
    border-radius: 20px;
    background: #999;
    background: linear-gradient(to bottom, #eee, #ddd);
}

.dropzone .dz-preview.dz-file-preview .dz-details {
    opacity: 1;
}

.dropzone .dz-preview.dz-image-preview {
    background: white;
}

.dropzone .dz-preview.dz-image-preview .dz-details {
    -webkit-transition: opacity 0.2s linear;
    -moz-transition: opacity 0.2s linear;
    -ms-transition: opacity 0.2s linear;
    -o-transition: opacity 0.2s linear;
    transition: opacity 0.2s linear;
}

.dropzone .dz-preview .dz-remove {
    font-size: 14px;
    text-align: center;
    display: block;
    cursor: pointer;
    border: none;
}

.dropzone .dz-preview .dz-remove:hover {
    text-decoration: underline;
}

.dropzone .dz-preview:hover .dz-details {
    opacity: 1;
}

.dropzone .dz-preview .dz-details {
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    font-size: 13px;
    min-width: 100%;
    max-width: 100%;
    padding: 2em 1em;
    text-align: center;
    color: rgba(0, 0, 0, 0.9);
    line-height: 150%;
}

.dropzone .dz-preview .dz-details .dz-size {
    margin-bottom: 1em;
    font-size: 16px;
}

.dropzone .dz-preview .dz-details .dz-filename {
    white-space: nowrap;
}

.dropzone .dz-preview .dz-details .dz-filename:hover span {
    border: 1px solid rgba(200, 200, 200, 0.8);
    background-color: rgba(255, 255, 255, 0.8);
}

.dropzone .dz-preview .dz-details .dz-filename:not(:hover) {
    overflow: hidden;
    text-overflow: ellipsis;
}

.dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {
    border: 1px solid transparent;
}

.dropzone .dz-preview .dz-details .dz-filename span,
.dropzone .dz-preview .dz-details .dz-size span {
    background-color: rgba(255, 255, 255, 0.4);
    padding: 0 0.4em;
    border-radius: 3px;
}

.dropzone .dz-preview:hover .dz-image img {
    -webkit-transform: scale(1.05, 1.05);
    -moz-transform: scale(1.05, 1.05);
    -ms-transform: scale(1.05, 1.05);
    -o-transform: scale(1.05, 1.05);
    transform: scale(1.05, 1.05);
    -webkit-filter: blur(8px);
    filter: blur(8px);
}

.dropzone .dz-preview .dz-image {
    border-radius: 20px;
    overflow: hidden;
    width: 120px;
    height: 120px;
    position: relative;
    display: block;
    z-index: 10;
}

.dropzone .dz-preview .dz-image img {
    display: block;
}

.dropzone .dz-preview.dz-success .dz-success-mark {
    -webkit-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
    -moz-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
    -ms-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
    -o-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
    animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
    margin-top: 40px !important;
}

.dropzone .dz-preview.dz-error .dz-error-mark {
    opacity: 1;
    -webkit-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
    -moz-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
    -ms-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
    -o-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
    animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
}

.dropzone .dz-preview .dz-success-mark,
.dropzone .dz-preview .dz-error-mark {
    pointer-events: none;
    opacity: 0;
    z-index: 500;
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    margin-left: -27px;
    margin-top: -27px;
}

.dropzone .dz-preview .dz-success-mark svg,
.dropzone .dz-preview .dz-error-mark svg {
    display: block;
    width: 54px;
    height: 54px;
}

.dropzone .dz-preview.dz-processing .dz-progress {
    opacity: 1;
    -webkit-transition: all 0.2s linear;
    -moz-transition: all 0.2s linear;
    -ms-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
}

.dropzone .dz-preview.dz-complete .dz-progress {
    opacity: 0;
    -webkit-transition: opacity 0.4s ease-in;
    -moz-transition: opacity 0.4s ease-in;
    -ms-transition: opacity 0.4s ease-in;
    -o-transition: opacity 0.4s ease-in;
    transition: opacity 0.4s ease-in;
}

.dropzone .dz-preview:not(.dz-processing) .dz-progress {
    -webkit-animation: pulse 6s ease infinite;
    -moz-animation: pulse 6s ease infinite;
    -ms-animation: pulse 6s ease infinite;
    -o-animation: pulse 6s ease infinite;
    animation: pulse 6s ease infinite;
}

.dropzone .dz-preview .dz-progress {
    opacity: 1;
    z-index: 1000;
    pointer-events: none;
    position: absolute;
    height: 16px;
    left: 50%;
    top: 50%;
    margin-top: -8px;
    width: 80px;
    margin-left: -40px;
    background: rgba(255, 255, 255, 0.9);
    -webkit-transform: scale(1);
    border-radius: 8px;
    overflow: hidden;
}

.dropzone .dz-preview .dz-progress .dz-upload {
    background: #333;
    background: linear-gradient(to bottom, #666, #444);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0;
    -webkit-transition: width 300ms ease-in-out;
    -moz-transition: width 300ms ease-in-out;
    -ms-transition: width 300ms ease-in-out;
    -o-transition: width 300ms ease-in-out;
    transition: width 300ms ease-in-out;
}

.dropzone .dz-preview.dz-error .dz-error-message {
    display: block;
}

.dropzone .dz-preview.dz-error:hover .dz-error-message {
    opacity: 1;
    pointer-events: auto;
}

.dropzone .dz-preview .dz-error-message {
    pointer-events: none;
    z-index: 1000;
    position: absolute;
    display: block;
    display: none;
    opacity: 0;
    -webkit-transition: opacity 0.3s ease;
    -moz-transition: opacity 0.3s ease;
    -ms-transition: opacity 0.3s ease;
    -o-transition: opacity 0.3s ease;
    transition: opacity 0.3s ease;
    border-radius: 8px;
    font-size: 13px;
    top: 130px;
    left: -10px;
    width: 140px;
    background: #be2626;
    background: linear-gradient(to bottom, #be2626, #a92222);
    padding: 0.5em 1.2em;
    color: white;
}

.dropzone .dz-preview .dz-error-message:after {
    content: "";
    position: absolute;
    top: -6px;
    left: 64px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #be2626;
}

.vue-dropzone {
    border: 2px solid #e5e5e5;
    font-family: "Arial", sans-serif;
    letter-spacing: 0.2px;
    color: #777;
    transition: 0.2s linear;
}

.vue-dropzone:hover {
    background-color: #f6f6f6;
}

.vue-dropzone>i {
    color: #ccc;
}

.vue-dropzone>.dz-preview .dz-image {
    border-radius: 0;
    width: 100%;
    height: 100%;
}

.vue-dropzone>.dz-preview .dz-image img:not([src]) {
    width: 200px;
    height: 200px;
}

.vue-dropzone>.dz-preview .dz-image:hover img {
    transform: none;
    -webkit-filter: none;
}

.vue-dropzone>.dz-preview .dz-details {
    bottom: -80px;
    top: 0;
    color: white;
    background-color: rgba(33, 150, 243, 0.8);
    transition: opacity 0.2s linear;
    text-align: left;
}

.vue-dropzone>.dz-preview .dz-details .dz-filename {
    overflow: hidden;
}

.vue-dropzone>.dz-preview .dz-details .dz-filename span,
.vue-dropzone>.dz-preview .dz-details .dz-size span {
    background-color: transparent;
}

.vue-dropzone>.dz-preview .dz-details .dz-filename:not(:hover) span {
    border: none;
}

.vue-dropzone>.dz-preview .dz-details .dz-filename:hover span {
    background-color: transparent;
    border: none;
}

.vue-dropzone>.dz-preview .dz-progress .dz-upload {
    background: #cccccc;
}

.vue-dropzone>.dz-preview .dz-remove {
    position: absolute;
    z-index: 30;
    color: white;
    margin-left: 15px;
    padding: 10px;
    top: inherit;
    bottom: -77px;
    left: 40px;
    border: 2px white solid;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 1.1px;
    opacity: 0;
}

.vue-dropzone>.dz-preview:hover .dz-remove {
    opacity: 1;
}

.vue-dropzone>.dz-preview .dz-success-mark,
.vue-dropzone>.dz-preview .dz-error-mark {
    margin-left: auto;
    margin-top: auto;
    width: 100%;
    top: 35%;
    left: 0;
    width: 54px !important;
    height: 54px !important;
    margin: 0 auto;
    left: 0;
    right: 0;
}

.vue-dropzone>.dz-preview .dz-success-mark svg,
.vue-dropzone>.dz-preview .dz-error-mark svg {
    margin-left: auto;
    margin-right: auto;
}

.vue-dropzone>.dz-preview .dz-error-message {
    margin-left: auto;
    margin-right: auto;
    left: 0;
    width: 100%;
    text-align: center;
}

.vue-dropzone>.dz-preview .dz-error-message:after {
    display: none;
}
</style>
