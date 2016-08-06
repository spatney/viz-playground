/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved. 
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *   
 *  The above copyright notice and this permission notice shall be included in 
 *  all copies or substantial portions of the Software.
 *   
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */


interface JQuery {
    /** Demonstrates how Power BI visual creation could be implemented as jQuery plugin */
    visual(plugin: Object, dataView?: Object): JQuery;
}

enum PlaygroundViewType {
    WebView,
    MobilePortraitView,
    MobileLandscapeView
}

module powerbi.visuals {
    /**
     * Demonstrates Power BI visualization elements and the way to embed them in standalone web page.
     */
    export class Playground {
        private static disabledVisuals: string[] = [
            "basicShape",
            "matrix",
            "playChart",
            "kpi",
            "scriptVisual",
            "slicer",
            "forceGraph",
            "mekkoChart",
            "gantt",
            "sunburstCustom",
            "timeline",
            "owlGauge",
            "debugVisual",
            "lineDotChart",
            "chordChart",
            "pulseChart"
        ];

        private static mobileInteractiveVisuals: string[] = [
            "areaChart",
            "barChart",
            "clusteredBarChart",
            "clusteredColumnChart",
            "columnChart",
            "donutChart",
            "hundredPercentStackedBarChart",
            "hundredPercentStackedColumnChart",
            "lineChart",
            "pieChart",
            "scatterChart",
            "table",
            "matrix",
            "multiRowCard"
        ];

        private static webTileRenderScale: number = 1;
        private static mobileDashboardTileRenderScale: number = 3;
        private static mobileInFocusTileRenderScale: number = 1;



        // The playground tabs/views
        private static webViewTab: JQuery;
        private static mobileViewTab: JQuery;

        // The visual containers which will hold the visual divs
        private static webContainer: JQuery;
        private static mobilePortraitDashboardContainer: JQuery;
        private static mobilePortraitInFocusContainer: JQuery;
        private static mobileLandscapeDashboardContainer: JQuery;
        private static mobileLandscapeInFocusContainer: JQuery;

        // Containers of the visuals containers - used to hide or show containers when switching between web and mobile tabs
        private static webContainers: JQuery;
        private static mobilePortraitContainers: JQuery;
        private static mobileLandscapeContainers: JQuery;

        // Controls
        private static visualsSelectElement: JQuery;
        private static mobileOrientationOptionsElement: JQuery;
        private static mobileOrientationPortraitRadioButton: JQuery;
        private static mobileOrientationLandscapeRadioButton: JQuery;
        private static optionsCapabilitiesElement: JQuery;
        private static interactionsEnabledCheckbox: JQuery;


        /** Performs sample app initialization.*/
        public static initialize(): void {
            this.webViewTab = $('#webViewTab');
            this.mobileViewTab = $('#mobileViewTab');
            this.visualsSelectElement = $('#visualTypes');
            this.mobileOrientationOptionsElement = $('#orientation');
            this.mobileOrientationPortraitRadioButton = this.mobileOrientationOptionsElement.find("input[value='portrait']");
            this.mobileOrientationLandscapeRadioButton = this.mobileOrientationOptionsElement.find("input[value='landscape']");
            this.optionsCapabilitiesElement = $('#capabilities');
            this.interactionsEnabledCheckbox = $("input[name='is_interactions']");

            this.webContainer = $('#webContainer');
            this.mobilePortraitDashboardContainer = $('#mobilePortraitDashboardContainer');
            this.mobilePortraitInFocusContainer = $('#mobilePortraitInFocusContainer');
            this.mobileLandscapeDashboardContainer = $('#mobileLandscapeDashboardContainer');
            this.mobileLandscapeInFocusContainer = $('#mobileLandscapeInFocusContainer');

            this.webContainers = this.webContainer.parent();
            this.mobilePortraitContainers = $('.mobile-portrait-image-container');
            this.mobileLandscapeContainers = $('.mobile-landscape-image-container');

            this.initializeView(PlaygroundViewType.WebView);

            this.populateVisualTypeSelect();


            this.webViewTab.click(() => { this.updateView(PlaygroundViewType.WebView); });
            this.mobileViewTab.click(() => { this.updateView(PlaygroundViewType.MobilePortraitView); });
            this.mobileOrientationPortraitRadioButton.click(() => { this.updateView(PlaygroundViewType.MobilePortraitView); });
            this.mobileOrientationLandscapeRadioButton.click(() => { this.updateView(PlaygroundViewType.MobileLandscapeView); });

            this.interactionsEnabledCheckbox.on('change', () => this.updateVisuals);

        }

        private static populateVisualTypeSelect(): void {
            this.visualsSelectElement.empty();

            let visuals = []
            visuals.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });

            visuals.forEach((visual) => {
                if (!Playground.disabledVisuals.some((visualName: string) => visualName === visual.name)) {
                    this.visualsSelectElement.append('<option value="' + visual.name + '">' + visual.name + '</option>');
                }
            });

            this.visualsSelectElement.change(() => this.onVisualTypeSelection(this.visualsSelectElement.val()));
        }

        private static onVisualTypeSelection(pluginName: string): void {
            if (pluginName.length === 0) {
                return;
            }

            this.createVisualPlugin(pluginName);
            // this.hostControls.update();
        }

        private static createVisualPlugin(pluginName: string): void {

            // create
            this.updateVisuals();
        }


        private static updateVisuals(): void {
        }

        private static updateVisual(host: {renderingScale;container}): void {

            let visualElement = Playground.getVisualElementInContainer(host.container);
            visualElement.empty();


            // Scale the visual back down to fit its container
            let scale = 1 / host.renderingScale;
            visualElement.attr('style', 'transform: scale(' + scale + '); transform-origin: top left;');
        }

        private static isMobileView(viewType: PlaygroundViewType): boolean {
            return viewType === PlaygroundViewType.MobilePortraitView || viewType === PlaygroundViewType.MobileLandscapeView;
        }

        private static initializeView(viewType: PlaygroundViewType): void {

                // Add or remove all mobile specific options
                if (this.isMobileView(viewType)) {
                    this.mobileOrientationOptionsElement.show();
                    this.optionsCapabilitiesElement.hide();
                }
                else {
                    this.mobileOrientationOptionsElement.hide();
                    this.optionsCapabilitiesElement.show();
                }

                this.clearAllVisuals();
                this.hideAllContainers();
                this.unhighlightTabs();
                
                // Update the visual's containers
                switch (viewType) {
                    case PlaygroundViewType.WebView:
                        this.highlightTab(this.webViewTab);
                        this.webContainers.show();

                        break;
                    case PlaygroundViewType.MobilePortraitView:
                        this.highlightTab(this.mobileViewTab);
                        this.mobilePortraitContainers.show();

                        break;
                    case PlaygroundViewType.MobileLandscapeView:
                        this.highlightTab(this.mobileViewTab);
                        this.mobileLandscapeContainers.show();

                        break;
                    default:
                        break;
                }

                if (this.isMobileView(viewType) && !this.isMobileView(viewType)) {
                    // Moved to mobile view from web
                    this.resetOrientationRadioButtons();
                }

        }

        private static updateView(viewType: PlaygroundViewType): void {

        }

        private static getVisualElementInContainer(container: JQuery): JQuery {
            return container.children('.visual').first();
        }

        private static unhighlightTabs(): void {
            this.webViewTab.find('div').first().removeClass('selected-nav-tab');
            this.mobileViewTab.find('div').first().removeClass('selected-nav-tab');
        }

        private static highlightTab(tabElement: JQuery): void {
            tabElement.find('div').first().addClass('selected-nav-tab');
        }

        private static resetOrientationRadioButtons(): void {
            $('input[name=orientation][value=portrait]').prop('checked', true);
            $('input[name=orientation][value=landscape]').prop('checked', false);
        }

        private static hideAllContainers(): void {
            this.webContainers.hide();
            this.mobilePortraitContainers.hide();
            this.mobileLandscapeContainers.hide();
        }

        private static clearAllVisuals(): void {
        }

        private static isInteractiveMode(): boolean {
            return this.interactionsEnabledCheckbox.is(':checked');
        }
    }
}