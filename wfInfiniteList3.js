/* two column version of wfinfinitelist 
  by jfwf@yeah.net 2014.10.
*/
/* need angular.js and iscroll-infinite-wf3.js 
    note!
      cell element should be half of the cacheSize.
      e.g. 15 child elements and cacheSize=30 .

    <wf-infinite-list2 > 
    must have following attrs:
      id               = unique string id.
      inf-element      = string:'.someCell' Note3!
      delegate         = object:delegateObject !note1
      page-size        = int: 30 , number of recs in each load.
      wrapper-parent-id        = wrapperXXXX , wrapperId for <wf-infinite-list2> elementId.
                          this string value should be unique in DOM 
                          and must be the same as this elementId.
                          e.g.  <wf-infinite-list2 id='w101' ... wrapper-id='w101'>  
    
    optional attrs:
      push-trigger-offset = 60
      push-start-html     = 'push to update'
      push-release-html   = 'release for update'
      push-loading-html   = 'updating'

      pull-trigger-offset = 60
      pull-start-html     = 'pull to load more'
      pull-release-html     = 'release for loading'
      pull-loading-html     = 'loading...'
      pull-nothing-html     = 'no more for loading' 



    !note1:
      delegate must have :
        delegate.onData=function(el,index)
        {
          el.innerHTML = 'cell'+index ;
        };
        delegate.onPullTriggered=function(sref,start0)
        {
          //staff...

          // onok: sref.pushPullLoadingFinished(isOk, isAll );
        };
        delegate.onPushTriggered=function(sref)
        {
          //staff...

          // onok: sref.pushPullLoadingFinished(isOk, isAll );
        };
        delegate.getDataCount=function()
        {
          return 0 ;
        } ;
        delegate.onScrollerReady=function(sref)
        {
          //the first push or scroll to history position.
          sref.pushLoadBegin() ;
          sref.setPullElementDisplay(false) ;
          //history: sref.scrollTo(x,y) ;
        } ; 



    !note2:
      After onPullTriggered/onPushTriggered
      finished, following method must be called 
      to make scroller know more data can be displayed.
        sref.pushPullLoadingFinished:function(isOk, isAll )


    sref useful functions:
      sref.setPullElementDisplay(boolValue) ;
      boolValue = sref.isPullElementDisplay() ;
      sref.pushLoadBegin() ;
      sref.pullLoadBegin() ;
      sref.scrollTo(x,y) 
      sref.refresh() ;
      sref.reorderInfinite() ;

    InfiniteElement useful properties:
      element._phase : index in datasource.
      element._top   : top position in scroller.


    !note3
    inf-element css style must like:
    .xxxCell {
      position:absolute;
      top:0px;
      left:0px;
      ...
    }

    --- new ----
    1.there should be nothing between <wf-infinite-list3> and </wf-infinite-list3>, even newline is bad.
      e.g. <wf-infinite-list3></wf-infinite-list3> is ok.
           <wf-infinite-list3> </wf-infinite-list3> is bad.
           <wf-infinite-list3>something</wf-infinite-list3> is bad.
           <wf-infinite-list3><p>text</p></wf-infinite-list3> is bad.
           <wf-infinite-list3>
           </wf-infinite-list3> is bad.

*/
angular.module('Wangf',['ngAnimate'])
  .directive('wfInfiniteList3',function($http,$timeout){
    return {
      restrict:'E' ,
      template:"<div style='position:absolute;width:100%;top:0px;bottom:0px;left:0px;overflow:hidden;'>"
              +"<div style='position:absolute;top:0px;left:0px;margin:0px;padding:0px;width:100%;'>"
              
              +"<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"

              +"<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"

              +"<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"


              +"<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"

              +"<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"

              +"<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"
              +"<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>"

              +"<div style='position:absolute;width:100%;top:-44px;left:0px;height:44px;'>push for updating.</div>"
              +"<div style='position:absolute;width:100%;top:9999px;left:0px;height:44px;'>pull for loading.</div>"

              +"</div>"
              
              +"</div>",
      transclude: false,
      scope:{delegate:"="
            },
      compile: function (element, attrs, transclude) { // the compilation of DOM is done here.
          // It is responsible for produce HTML DOM or it returns a combined link function
          // Further Docuumentation on this - http://docs.angularjs.org/guide/directive
          /*
          var containerHtml = "<div style='position:absolute;width:100%;top:0px;bottom:0px;overflow:hidden;'></div>"; // the HTML to be produced
          element.append(containerHtml) ;
          var containerEl = element.children() ;
          var scrollHtml = "<div style='position:absolute;top:0px;left:0px;margin:0px;padding:0px;width:100%;'></div>";
          containerEl.append(scrollHtml) ;
          var scrollEl = containerEl.children() ;
          var cellHtml ="<div style='position:absolute;top:0px;left:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>";
          for(var i = 0 ; i<15 ; i++ )
          {
            scrollEl.append(cellHtml) ;
          }
          cellHtml="<div style='position:absolute;top:0px;right:0px;width:50%;margin:0px;padding:0px;height:44px;' ng-click='tapped($event.target)'></div>";
          for(var i = 0 ; i<15 ; i++ )
          {
            scrollEl.append(cellHtml) ;
          }*/
          return function(scope,element,attrs)
          {
            var wrapper = element[0].firstChild ;
            var scroller = wrapper.firstChild ;
            var lrCells = [];
            lrCells[0]=[];
            lrCells[1]=[];
            var cells = scroller.childNodes ;
            for(var i = 0 ; i<15 ; i++ )
            {
              lrCells[0][i] = cells[i] ;
              lrCells[1][i] = cells[15+i] ;
            }
            var pushcell = cells[30] ;
            var pullcell = cells[31] ;

            scope.scrollList = new IScroll({
              tap:true ,
              wrapper:wrapper,
              scroller:scroller,
              delegate:scope.delegate , 
              lrcells:lrCells ,
              pushcell:pushcell,
              pullcell:pullcell,
              pushenable:true,
              pullenable:true
              //Array(2,N) ;
              /*pushTriggerOffset:scope.pushTriggerOffset,
              pushStartHtml:scope.pushStartHtml,
              pushReleaseHtml:scope.pushReleaseHtml,
              pushLoadingHtml:scope.pushLoadingHtml,
              pullTriggerOffset:scope.pullTriggerOffset,
              pullStartHtml:scope.pullStartHtml,
              pullReleaseHtml:scope.pullReleaseHtml,
              pullLoadingHtml:scope.pullLoadingHtml,
              pullNothingHtml:scope.pullNothingHtml*/
            });
            // scope.delegate.onScrollerReady(scope.scroller) ;
          } ;// link function end.
      }// compile function end.
    } ;
}) ;