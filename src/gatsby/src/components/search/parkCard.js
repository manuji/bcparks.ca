import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Card, CardContent } from "@mui/material"
import Carousel from "react-material-ui-carousel"
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'

import ParkAccessStatus from "../../components/park/parkAccessStatus"

import parksLogo from "../../images/Mask_Group_5.png"
import campingIcon from "../../../static/icons/vehicle-accessible-camping.svg"
import backcountryCampingIcon from "../../../static/icons/wilderness-camping.svg"
import hikingIcon from "../../../static/icons/hiking.svg"
import picincIcon from "../../../static/icons/picnic-areas.svg"
import swimmingIcon from "../../../static/icons/swimming.svg"
import cyclingIcon from "../../../static/icons/cycling.svg"
import petsIcon from "../../../static/icons/pets-on-leash.svg"
import campfireBanIcon from "../../../static/icons/campfire-ban.svg"

import { addSmallImagePrefix, handleImgError } from "../../utils/helpers"

const locationLabel = (parkLocation) => {
  if (parkLocation?.section !== "Haida Gwaii/South Island") {
    return parkLocation?.section;
  }
  if (parkLocation.managementArea === "Haida Gwaii") {
    return "Haida Gwaii";
  } else {
    return ("South Island");
  }
}

const Icon = ({ src, label, size }) => {
  return (
    <img src={src}
      alt={label}
      aria-label={label}
      className="mr-1 mb-1"
      width={size}
      height={size}>
    </img>
  )
}

const FeatureIcons = ({ park }) => {
  const iconSize = 32;
  const facilities = park.parkFacilities.filter(f => [1, 6, 36].includes(f.num)) || [];
  const activities = park.parkActivities.filter(a => [1, 3, 8, 9].includes(a.num)) || [];

  return (
    <>
      {facilities.some(x => x.code === 'vehicle-accessible-camping') &&
        <Icon src={campingIcon} label="Vehicle accesible camping" size={iconSize} />
      }
      {facilities.some(x => x.code === 'backcountry-camping') &&
        <Icon src={backcountryCampingIcon} label="Backcountry camping" size={iconSize} />
      }
      {activities.some(x => x.code === 'hiking') &&
        <Icon src={hikingIcon} label="Hiking" size={iconSize} />
      }
      {facilities.some(x => x.code === 'picnic-areas') &&
        <Icon src={picincIcon} label="Picnic areas" size={iconSize} />
      }
      {activities.some(x => x.code === 'swimming') &&
        <Icon src={swimmingIcon} label="Swimming" size={iconSize} />
      }
      {activities.some(x => x.code === 'cycling') &&
        <Icon src={cyclingIcon} label="Cycling" size={iconSize} />
      }
      {activities.some(x => x.code === 'pets-on-leash') &&
        <Icon src={petsIcon} label="Pets on leash" size={iconSize} />
      }
      {facilities.some(x => [1, 36].includes(x.num)) ? (
        <GatsbyLink to={`/${park.slug}/#park-camping-details-container`}>
          <p aria-label="See all facilities and activities">see all</p>
        </GatsbyLink>
      ) : (
        (activities.length > 0 || facilities.length > 0) && (
          facilities.some(x => x.code === 'picnic-areas') ? (
            <GatsbyLink to={`/${park.slug}/#park-facility-container`}>
              <p aria-label="See all facilities and activities">see all</p>
            </GatsbyLink>
          ) : (
            <GatsbyLink to={`/${park.slug}/#park-activity-container`}>
              <p aria-label="See all facilities and activities">see all</p>
            </GatsbyLink>
          )
        )
      )}
    </>
  )
}

const ParkCard = ({ r }) => {
  return (
    <div className="m20t">
      <Card className="d-none d-xl-block d-lg-block d-md-none d-sm-none d-xs-none">
        <CardContent className="park-card park-card-desktop">
          <div className="row search-result-card no-gutters">
            <div className="col-12">
              <div className="row no-gutters">
                {r.parkPhotos &&
                  r.parkPhotos.length === 0 && (
                    <div className="col-lg-auto close-margin park-image-div park-image-logo-div">
                      <img
                        alt="logo"
                        className="search-result-logo-image"
                        src={parksLogo}
                      />
                    </div>
                  )}
                {r.parkPhotos &&
                  r.parkPhotos.length === 1 && (
                    <div className="col-lg-auto close-margin park-image-div">
                      <img
                        alt="park"
                        className="search-result-image"
                        src={addSmallImagePrefix(r.parkPhotos[0])}
                        onError={(e) => { handleImgError(e, r.parkPhotos[0]) }}
                      />
                    </div>
                  )}
                {r.parkPhotos &&
                  r.parkPhotos.length > 1 && (
                    <div className="col-lg-auto close-margin park-image-div">
                      <Carousel
                        className="park-carousel"
                        autoPlay={false}
                        indicators={true}
                        navButtonsAlwaysVisible={true}
                        animation="fade"
                        timeout={200}
                        height="200px"
                        navButtonsWrapperProps={{
                          className: "carousel-nav"
                        }}
                        navButtonsProps={{
                          className: "carousel-nav-botton"
                        }}
                        indicatorContainerProps={{
                          className: "indicator"
                        }}
                        indicatorIconButtonProps={{
                          className: "indicator-button"
                        }}
                        activeIndicatorIconButtonProps={{
                          className: "indicator-button--active"
                        }}
                      >
                        {r.parkPhotos.map(
                          (item, index) => {
                            return (
                              <img
                                alt="park carousel"
                                key={index}
                                className="search-result-image"
                                src={addSmallImagePrefix(item)}
                                onError={(e) => { handleImgError(e, item) }} />
                            )
                          }
                        )}
                      </Carousel>
                    </div>
                  )}

                <div className="col park-content">
                  <div className="park-content-top">
                    <GatsbyLink
                      to={`/${r.slug}/`}
                      className="underline-hover"
                    >
                      <h2 className="park-heading-text">
                        {r.protectedAreaName}
                        <ExpandCircleDownIcon className="park-heading-icon" />
                      </h2>
                    </GatsbyLink>
                    <p>{locationLabel(r.parkLocations.length ? r.parkLocations[0] : {})}</p>
                  </div>
                  <div className="park-content-bottom">
                    <div className="park-content-bottom--left">
                      <FeatureIcons park={r} />
                    </div>
                    <div className="park-content-bottom--right text-blue">
                      <ParkAccessStatus
                        advisories={r.advisories}
                        slug={r.slug}
                      />
                      {r.hasCampfireBan &&
                        <div className="campfire-ban-icon">
                          <Icon src={campfireBanIcon} label="Campfire ban" size="24" />
                          <span>No campfires</span>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="d-block d-sm-block d-xs-block d-md-block d-lg-none d-xl-none">
        <CardContent className="park-card">
          <div className="row search-result-card no-gutters">
            <div className="col-12">
              <div className="row no-gutters">
                {r.parkPhotos &&
                  r.parkPhotos.length === 0 && (
                    <div className="col-12 close-margin park-image-div-mobile park-image-logo-div">
                      <img
                        alt="logo"
                        className="search-result-logo-image"
                        src={parksLogo}
                      />
                    </div>
                  )}
                {r.parkPhotos &&
                  r.parkPhotos.length === 1 && (
                    <div className="col-12 close-margin park-image-div-mobile">
                      <img
                        alt="park"
                        className="search-result-image"
                        src={addSmallImagePrefix(r.parkPhotos[0])}
                        onError={(e) => { handleImgError(e, r.parkPhotos[0]) }}
                      />
                    </div>
                  )}
                {r.parkPhotos &&
                  r.parkPhotos.length > 1 && (
                    <div className="col-12 close-margin park-image-div-mobile">
                      <Carousel
                        className="park-carousel-mobile"
                        autoPlay={false}
                        indicators={true}
                        navButtonsAlwaysVisible={true}
                        animation="fade"
                        timeout={200}
                        height="100%"
                        navButtonsWrapperProps={{
                          className: "carousel-nav"
                        }}
                        navButtonsProps={{
                          className: "carousel-nav-botton"
                        }}
                        indicatorContainerProps={{
                          className: "indicator"
                        }}
                        indicatorIconButtonProps={{
                          className: "indicator-button"
                        }}
                        activeIndicatorIconButtonProps={{
                          className: "indicator-button--active"
                        }}
                      >
                        {r.parkPhotos.map(
                          (item, index) => {
                            return (
                              <img
                                alt="park carousel"
                                key={index}
                                className="search-result-image"
                                src={addSmallImagePrefix(item)}
                                onError={(e) => { handleImgError(e, item) }}
                              />
                            )
                          }
                        )}
                      </Carousel>
                    </div>
                  )}

                <div className="col-12 park-content-mobile">
                  <GatsbyLink
                    to={`/${r.slug}/`}
                    className="p10t underline-hover"
                  >
                    <h2 className="park-heading-text">
                      {r.protectedAreaName}
                      <ExpandCircleDownIcon className="park-heading-icon" />
                    </h2>
                  </GatsbyLink>
                  <p>{locationLabel(r.parkLocations.length ? r.parkLocations[0] : {})}</p>
                  <div>
                    <FeatureIcons park={r} />
                  </div>
                  <div className="text-blue">
                    <ParkAccessStatus
                      advisories={r.advisories}
                      slug={r.slug}
                    />
                    {r.hasCampfireBan &&
                      <div className="campfire-ban-icon">
                        <Icon src={campfireBanIcon} label="Campfire ban" size="24" />
                        <span>No campfires</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ParkCard