import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Talks = () => (

    <Layout>
    <Seo title="Talks" />
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-5xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-6xl md:mx-auto">
          Talks
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Learn some knowledge from those who have their hands on the wheel with Apptainer. Learn their ways, techniques, or even get some enlightenment about where to use Apptainer.
        </p>
      </div>
  </div>
      <div className="bg-gray-100 py-10">
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col bg-white border rounded shadow-sm lg:flex-row">
            <div className="flex flex-col justify-between p-5 border-b sm:p-10 lg:border-b-0">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                  CTRL IQ WEEKLY WEBINAR SERIES
                </p>
                <h5 className="mb-4 text-2xl font-extrabold leading-none sm:text-3xl">
                  Apptainer 1.1.0 Has Been Released
                </h5>
                <p className="mb-4 text-base text-gray-700 md:text-lg sm:mb-8">
                  A discussion of the new features and updated security posture of the groundbreaking Apptainer 1.1.0 release. 
                </p>
              </div>
              <div className="flex items-center">
                <Link to="https://youtu.be/lZENN9LVqY8">
                  <button
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                  >
                    View Presentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col bg-white border rounded shadow-sm lg:flex-row">
            <div className="flex flex-col justify-between p-5 border-b sm:p-10 lg:border-b-0">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                  2017 HPC Advisory Council Stanford Conference
                </p>
                <h5 className="mb-4 text-2xl font-extrabold leading-none sm:text-3xl">
                  Singularity: Containers for Science, Reproducibility, and HPC
                </h5>
                <p className="mb-4 text-base text-gray-700 md:text-lg sm:mb-8">
                  This talk explores how Singularity combines software packaging models with minimalistic containers to create very lightweight application bundles which can be simply executed and contained completely within their environment or be used to interact directly with the host file systems at native speeds.
                </p>
              </div>
              <div className="flex items-center">
                <Link to="https://www.youtube.com/watch?v=DA87Ba2dpNM">
                  <button
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                  >
                    View Presentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col bg-white border rounded shadow-sm lg:flex-row">
            <div className="flex flex-col justify-between p-5 border-b sm:p-10 lg:border-b-0">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                  CTRL IQ WEEKLY WEBINAR SERIES
                </p>
                <h5 className="mb-4 text-2xl font-extrabold leading-none sm:text-3xl">
                  Container Education Series: Building Apptainer Containers
                </h5>
                <p className="mb-4 text-base text-gray-700 md:text-lg sm:mb-8">
                  A deep dive starting generally and venturing into the obscure and dark corners of container building with Apptainer. 
                </p>
              </div>
              <div className="flex items-center">
                <Link to="https://youtu.be/DmrkxzW_F1Q">
                  <button
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                  >
                    View Presentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col bg-white border rounded shadow-sm lg:flex-row">
            <div className="flex flex-col justify-between p-5 border-b sm:p-10 lg:border-b-0">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                  Daniel Persson
                </p>
                <h5 className="mb-4 text-2xl font-extrabold leading-none sm:text-3xl">
                  Building containers with Singularity
                </h5>
                <p className="mb-4 text-base text-gray-700 md:text-lg sm:mb-8">
                  Learn how to use Singularity to create containers both in interactive mode and using definition files to automate the build.
                </p>
              </div>
              <div className="flex items-center">
                <Link to="https://www.youtube.com/watch?v=nrgO3Q8-6hQ">
                  <button
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                  >
                    View Presentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col bg-white border rounded shadow-sm lg:flex-row">
            <div className="flex flex-col justify-between p-5 border-b sm:p-10 lg:border-b-0">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                  San Diego Supercomputer Center
                </p>
                <h5 className="mb-4 text-2xl font-extrabold leading-none sm:text-3xl">
                  Introduction to Singularity: Containers for Scientific and High-Performance Computing
                </h5>
                <p className="mb-4 text-base text-gray-700 md:text-lg sm:mb-8">
                  In this webinar, we provide an overview of Singularity and how you might incorporate the use of containers in your own research. We also show you how to access and use some of the containerized applications that we make available to users on XSEDE systems like Comet and Expanse at SDSC.
                </p>
              </div>
              <div className="flex items-center">
                <Link to="https://www.youtube.com/watch?v=vEjLuX0ClN0">
                  <button
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                  >
                    View Presentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col bg-white border rounded shadow-sm lg:flex-row">
            <div className="flex flex-col justify-between p-5 border-b sm:p-10 lg:border-b-0">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                  WestGrid
                </p>
                <h5 className="mb-4 text-2xl font-extrabold leading-none sm:text-3xl">
                  Singularity: Containers for High-Performance Computing
                </h5>
                <p className="mb-4 text-base text-gray-700 md:text-lg sm:mb-8">
                  This session will provide an overview of the main features and benefits of Singularity, as well as a demonstration of how to run Singularity on WestGrid and Compute Canada systems, how to access filesystems from the container, and how to convert Docker containers to Singularity applications.
                </p>
              </div>
              <div className="flex items-center">
                <Link to="https://www.youtube.com/watch?v=a2Yh0t1Azd0">
                  <button
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                  >
                    View Presentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col bg-white border rounded shadow-sm lg:flex-row">
            <div className="flex flex-col justify-between p-5 border-b sm:p-10 lg:border-b-0">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                  NVIDIA Developer
                </p>
                <h5 className="mb-4 text-2xl font-extrabold leading-none sm:text-3xl">
                  Run NVIDIA GPU Cloud Containers in Singularity
                </h5>
                <p className="mb-4 text-base text-gray-700 md:text-lg sm:mb-8">
                  This video covers installing and configuring Singularity, pulling and saving NGC containers and running NGC containers in an HPC environment.
                </p>
              </div>
              <div className="flex items-center">
                <Link to="https://www.youtube.com/watch?v=iOLVqqHQsBU">
                  <button
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                  >
                    View Presentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col bg-white border rounded shadow-sm lg:flex-row">
            <div className="flex flex-col justify-between p-5 border-b sm:p-10 lg:border-b-0">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                  ISC High Performance
                </p>
                <h5 className="mb-4 text-2xl font-extrabold leading-none sm:text-3xl">
                  Singularity Introduction
                </h5>
                <p className="mb-4 text-base text-gray-700 md:text-lg sm:mb-8">
                  Michael Bauer provides an introduction into the HPC container runtime Singularity.
                </p>
              </div>
              <div className="flex items-center">
                <Link to="https://www.youtube.com/watch?v=29NLgM9fnh4">
                  <button
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                  >
                    View Presentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col bg-white border rounded shadow-sm lg:flex-row">
            <div className="flex flex-col justify-between p-5 border-b sm:p-10 lg:border-b-0">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                  2018 Swiss HPC Conference
                </p>
                <h5 className="mb-4 text-2xl font-extrabold leading-none sm:text-3xl">
                  Containers Using Singularity on HPC
                </h5>
                <p className="mb-4 text-base text-gray-700 md:text-lg sm:mb-8">
                  In this video from the 2018 Swiss HPC Conference, Abhinav Thota, from Indiana University presents: Containers Using Singularity on HPC.
                </p>
              </div>
              <div className="flex items-center">
                <Link to="https://www.youtube.com/watch?v=2Aap7pstFog">
                  <button
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                  >
                    View Presentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col bg-white border rounded shadow-sm lg:flex-row">
            <div className="flex flex-col justify-between p-5 border-b sm:p-10 lg:border-b-0">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                  EUM'21
                </p>
                <h5 className="mb-4 text-2xl font-extrabold leading-none sm:text-3xl">
                  Easy-Build Singularity Containers
                </h5>
                <p className="mb-4 text-base text-gray-700 md:text-lg sm:mb-8">
                  In this hands on tutorial we will build 2 containers: a simple one to give users an understanding of how the set of scripts are working and how we can build for example Debian or CentOS containers without much knowledge of the background mechanisms. In the second, more advanced part, we show how to open up the containers and give users are chance to install their bespoken pipelines and use the power of the containers to run that on virtually any suitable platform.
                </p>
              </div>
              <div className="flex items-center">
                <Link to="https://www.youtube.com/watch?v=34SFF5Ow7Og">
                  <button
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                  >
                    View Presentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col bg-white border rounded shadow-sm lg:flex-row">
            <div className="flex flex-col justify-between p-5 border-b sm:p-10 lg:border-b-0">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                  WestGrid
                </p>
                <h5 className="mb-4 text-2xl font-extrabold leading-none sm:text-3xl">
                  Singularity in High Performance Computing (HPC)
                </h5>
                <p className="mb-4 text-base text-gray-700 md:text-lg sm:mb-8">
                  In this webinar, we cover the basics of using Singularity and best practices of using it on Compute Canada HPC systems. We then discuss the common use cases and our experience with Singularity, and review the recent developments and changes in the newest versions of Singularity 3. The webinar is intended for everyone with basic skills in the Linux command line.
                </p>
              </div>
              <div className="flex items-center">
                <Link to="https://www.youtube.com/watch?v=z-RtotX0i_0">
                  <button
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                  >
                    View Presentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col bg-white border rounded shadow-sm lg:flex-row">
            <div className="flex flex-col justify-between p-5 border-b sm:p-10 lg:border-b-0">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                  Computational Biomedicine
                </p>
                <h5 className="mb-4 text-2xl font-extrabold leading-none sm:text-3xl">
                  Singularity: simple, secure containers for HPC
                </h5>
                <p className="mb-4 text-base text-gray-700 md:text-lg sm:mb-8">
                  Singularity is the most widely used container solution in high-performance computing (HPC). Instead of a layered filesystem, a Singularity container is stored in a single file. This simplifies the container management lifecycle and facilitates features such as image signing and verification to produce trusted containers.
                </p>
              </div>
              <div className="flex items-center">
                <Link to="https://www.youtube.com/watch?v=cWncCvFM2ak">
                  <button
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                  >
                    View Presentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col bg-white border rounded shadow-sm lg:flex-row">
            <div className="flex flex-col justify-between p-5 border-b sm:p-10 lg:border-b-0">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                  hpc-ch
                </p>
                <h5 className="mb-4 text-2xl font-extrabold leading-none sm:text-3xl">
                  Benchmarking MPI Applications in Singularity Containers on Traditional HPC and Cloud Infrastructures
                </h5>
                <p className="mb-4 text-base text-gray-700 md:text-lg sm:mb-8">
                  In this presentation, Benchmarking over traditional HPC is presented.
                </p>
              </div>
              <div className="flex items-center">
                <Link to="https://www.youtube.com/watch?v=3Q-IS6MFgb4">
                  <button
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                  >
                    View Presentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="flex flex-col bg-white border rounded shadow-sm lg:flex-row">
            <div className="flex flex-col justify-between p-5 border-b sm:p-10 lg:border-b-0">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                  USC Advanced Research Computing
                </p>
                <h5 className="mb-4 text-2xl font-extrabold leading-none sm:text-3xl">
                  Software Containers with Singularity
                </h5>
                <p className="mb-4 text-base text-gray-700 md:text-lg sm:mb-8">
                  An overview of software containers and how to use Singularity to create and run containers for research and high-performance computing tasks.
                </p>
              </div>
              <div className="flex items-center">
                <Link to="https://www.youtube.com/watch?v=xty42A05Wg0">
                  <button
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                  >
                    View Presentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  </Layout>
)
export default Talks