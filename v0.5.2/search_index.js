var documenterSearchIndex = {"docs":
[{"location":"ECCO/","page":"ECCO","title":"ECCO","text":"The workflow presented here is as follows.","category":"page"},{"location":"ECCO/","page":"ECCO","title":"ECCO","text":"set up for running analyses of ECCO estimates.\nrun one computation loop on the ECCO monthly files.","category":"page"},{"location":"ECCO/","page":"ECCO","title":"ECCO","text":"ECCO.standard_analysis_setup","category":"page"},{"location":"ECCO/#Climatology.ECCO.standard_analysis_setup","page":"ECCO","title":"Climatology.ECCO.standard_analysis_setup","text":"ECCO.standard_analysis_setup(pth0::String)\n\nCreate temporary run folder pth where data folder pth0 will be linked. \n\nData folder pth0 should be the path to ECCO data.\n\nFor example:\n\nusing Climatology, Pkg\npth=ECCO.standard_analysis_setup(ScratchSpaces.ECCO)\n\nThe Project.toml file found in pth provides an environment ready for ECCO analyses. \n\nThis environment can be activated and instantiated:\n\nPkg.activate(pth)\nPkg.instantiate()\n\n\n\n\n\n","category":"function"},{"location":"ECCO/","page":"ECCO","title":"ECCO","text":"Here is an example of parameters P to compute zonal mean temperatures at level 5.","category":"page"},{"location":"ECCO/","page":"ECCO","title":"ECCO","text":"ECCO_helpers.parameters","category":"page"},{"location":"ECCO/#Climatology.ECCO_helpers.parameters","page":"ECCO","title":"Climatology.ECCO_helpers.parameters","text":"parameters(P0,params)\n\nPrepare parameter NamedTuple for use in ECCO_diagnostics.driver.\n\nP1=parameters(P0,p) \n\nis faster than e.g. parameters(pth,\"r2\",p) as grid, etc get copied from P0 to P1.\n\n\n\n\n\nparameters(pth0::String,sol0::String,params)\n\nPrepare parameter NamedTuple for use in ECCO_diagnostics.driver.\n\nFor example, to compute zonal mean temperatures at level 5:\n\np=(calc = \"zonmean\", nam = \"THETA\", lev = 5)\npth=ECCO.standard_analysis_setup(ScratchSpaces.ECCO)\nP0=ECCO_helpers.parameters(pth,\"r2\",p)\n\nor, from a predefined list:\n\nlist0=ECCO_helpers.standard_list_toml(\"\")\npth=ECCO.standard_analysis_setup(ScratchSpaces.ECCO)\nP1=ECCO_helpers.parameters(pth,\"r2\",list0[1])\n\n\n\n\n\n","category":"function"},{"location":"ECCO/","page":"ECCO","title":"ECCO","text":"The computation loop, over all months, can then be carried out as follows.","category":"page"},{"location":"ECCO/","page":"ECCO","title":"ECCO","text":"ECCO_diagnostics.driver","category":"page"},{"location":"ECCO/#Climatology.ECCO_diagnostics.driver","page":"ECCO","title":"Climatology.ECCO_diagnostics.driver","text":"driver(P)\n\nCall main computation loop as specified by parameters P.\n\nThe main computation loop choice depends on the P parameter values. Methods include:\n\nmain_clim\nmain_glo\nmain_zonmean\nmain_overturn\nmain_MHT\nmain_trsp\n\n\n\n\n\n","category":"function"},{"location":"ECCO/","page":"ECCO","title":"ECCO","text":"Modules = [Climatology.ECCO_io]","category":"page"},{"location":"ECCO/#Climatology.ECCO_io.read_monthly-Tuple{Any, Any, Any}","page":"ECCO","title":"Climatology.ECCO_io.read_monthly","text":"read_monthly(P,nam,t)\n\nRead record t for variable nam from file locations specified via parameters P.\n\nThe method used to read nam is selected based on nam's value. Methods include:\n\nread_monthly_default\nread_monthly_SSH\nread_monthly_MHT\nread_monthly_BSF\n\n\n\n\n\n","category":"method"},{"location":"examples/#Physical-Oceanography","page":"Examples","title":"Physical Oceanography","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"Ocean State Estimate (➭ code link) : explore the Ocean climatology for temperature, currents, and more.\nSea Level Estimates (➭ code link) : plot global mean sea level data from NASA and Dataverse.","category":"page"},{"location":"examples/#Detail","page":"Examples","title":"Detail","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"ECCO_standard_plots.jl lets you explore climate indices and climatologies derived (via this and that) from gridded, time-variable ocean climatologies (ECCO4, OCCA2). The data is retrieved from dataverse.org, and intermediate results from zenodo.org.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"NSLCT_notebook.jl lets you access sea level data from NASA and Dataver portals (HTTP.jl, Dataverse.jl), organize it into tables (DataFrames.jl), and plot it (Makie.jl).","category":"page"},{"location":"examples/#Marine-Ecosystems","page":"Examples","title":"Marine Ecosystems","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"Plankton, Chemistry, and Light (➭ code link) : visualize ocean colour and biomass climatologies\nCBIOMES_climatology_create (➭ code link) : recreate the CBIOMES-global climatology files","category":"page"},{"location":"examples/#Detail-2","page":"Examples","title":"Detail","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"The CBIOMES1 climatology (alpha version) is a global ocean state estimate that covers the period from 1992 to 2011 (ECCO). It is based on Forget et al 2015 for ocean physics MIT general circulation model and on Dutkiewicz et al 2015 for marine biogeochemistry and ecosystems Darwin Project model.","category":"page"},{"location":"examples/#Other-Notebooks","page":"Examples","title":"Other Notebooks","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"OptimalTransport_demo.jl : using optimal transport for e.g. model-data comparison\nHadIOD_viz.jl : download, read, and plot a subset of the HadIOD T/S database","category":"page"},{"location":"examples/#References","page":"Examples","title":"References","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"OCCA1 : Forget 2010\nECCO4 : Forget et al 2015\nCBIOMES1: Forget 2018\nOCCA2 : Forget 2024","category":"page"},{"location":"examples/#Notes","page":"Examples","title":"Notes","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"note: Note\nFor more on these estimates, and how to use them in Julia, please refer to the following documentation and links therein.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"MeshArrays.jl : gridded Earth variables, domain decomposition, C-grid support; Ocean Circulation, Geography tutorials.\nMITgcmTools.jl : framework to interact with MITgcm (setup, run, output, plot, etc) and ECCO output.\nIndividualDisplacements.jl : simulation and analysis of materials moving through oceanic and atmospheric flows.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"note: Note\nFor more notebooks involving CBIOMES and related efforts, take a look at the following pages.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Marine Ecosystem Notebooks : Darwin Model, Ocean Color data, Gradients field program, and more.\nJuliaCon2021 workshop : Modeling Marine Ecosystems At Multiple Scales Using Julia.\nPlanktonIndividuals.jl : simulate the life cycle of ocean phytoplankton cells and their environment.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"note: Note\nTo run the notebook on a local computer or in the cloud, please refer to the Pluto docs. Directions are also provided in the following pages.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"ECCO_standard_plots.jl\nJuliaClimate How-To \nECCO/Julia storymap\nvideo demonstration","category":"page"},{"location":"#Climatology.jl","page":"Home","title":"Climatology.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package is currently focused on serving and deriving climatologies from ocean state estimates. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"See Physical Oceanography and Marine Ecosystems for examples.","category":"page"},{"location":"","page":"Home","title":"Home","text":"It is in early development stage; breaking changes remain likely.","category":"page"},{"location":"API/#Intro","page":"Files","title":"Intro","text":"","category":"section"},{"location":"API/","page":"Files","title":"Files","text":"Climatologies are readily downloaded and accessed using the Scratch.jl artifact system as explained below. ","category":"page"},{"location":"API/#Use-Examples","page":"Files","title":"Use Examples","text":"","category":"section"},{"location":"API/#ECCO","page":"Files","title":"ECCO","text":"","category":"section"},{"location":"API/","page":"Files","title":"Files","text":"ECCO climatology files can downloaded using get_ecco_files. These files are for version 4 release 2, on the native model grid.","category":"page"},{"location":"API/","page":"Files","title":"Files","text":"using Climatology\nget_ecco_variable_if_needed(\"ETAN\")\n\nusing MeshArrays, MITgcm, NetCDF\npath=joinpath(ScratchSpaces.ECCO,\"ETAN/ETAN\")\nγ=GridSpec(\"LatLonCap\",MeshArrays.GRID_LLC90)\ntmp=read_nctiles(path,\"ETAN\",γ,I=(:,:,1))","category":"page"},{"location":"API/","page":"Files","title":"Files","text":"Precomputed quantities shown in ECCO_standard_plots.jl can be downloaded separately.","category":"page"},{"location":"API/","page":"Files","title":"Files","text":"Climatology.ECCOdiags_add(\"release2\")\nreaddir(ScratchSpaces.ECCO)","category":"page"},{"location":"API/#OCCA","page":"Files","title":"OCCA","text":"","category":"section"},{"location":"API/","page":"Files","title":"Files","text":"get_occa_variable_if_needed(\"SIarea\")\nreaddir(ScratchSpaces.OCCA)","category":"page"},{"location":"API/#CBIOMES","page":"Files","title":"CBIOMES","text":"","category":"section"},{"location":"API/","page":"Files","title":"Files","text":"To retrieve the CBIOMES climatology, in the julia REPL for example :","category":"page"},{"location":"API/","page":"Files","title":"Files","text":"println(datadep\"CBIOMES-clim1\")\nreaddir(datadep\"CBIOMES-clim1\")","category":"page"},{"location":"API/","page":"Files","title":"Files","text":"And the files, now found in datadep\"CBIOMES-clim1\", can then be read using other libraries.","category":"page"},{"location":"API/","page":"Files","title":"Files","text":"using NCDatasets\nfil=joinpath(datadep\"CBIOMES-clim1\",\"CBIOMES-global-alpha-climatology.nc\")\nnc=NCDataset(fil,\"r\")\nkeys(nc)","category":"page"},{"location":"API/#MITprof","page":"Files","title":"MITprof","text":"","category":"section"},{"location":"API/","page":"Files","title":"Files","text":"To retrieve the MITprof climatologies :","category":"page"},{"location":"API/","page":"Files","title":"Files","text":"readdir(datadep\"MITprof-clim1\")","category":"page"},{"location":"API/#Path-Names","page":"Files","title":"Path Names","text":"","category":"section"},{"location":"API/","page":"Files","title":"Files","text":"Gridded fields are mostly retrieved from Harvard Dataverse. These can be relatively large files, compared to the package codes, so they are handled lazily (only downloaded when needed). Precomputed diagnostics have also been archived on zenodo.org.","category":"page"},{"location":"API/","page":"Files","title":"Files","text":"Artifact Name File Type Download Method\nScratchSpaces.ECCO NetCDF lazy, by variable, dataverse\nScratchSpaces.ECCO JLD2 lazy, whole, zenodo\ndatadep\"MITprof-clim1\" binary lazy, whole, zenodo\nScratchSpaces.OCCA NetCDF lazy, by variable, dataverse\ndatadep\"CBIOMES-clim1\" NetCDF lazy, whole, zenodo","category":"page"},{"location":"API/#Functions-Reference","page":"Files","title":"Functions Reference","text":"","category":"section"},{"location":"API/","page":"Files","title":"Files","text":"Modules = [Climatology.downloads]","category":"page"},{"location":"API/#Climatology.downloads.CBIOMESclim_download","page":"Files","title":"Climatology.downloads.CBIOMESclim_download","text":"CBIOMESclim_download()\n\nDownload lazy artifact to scratch space.\n\n\n\n\n\n","category":"function"},{"location":"API/#Climatology.downloads.ECCOdiags_add-Tuple{String}","page":"Files","title":"Climatology.downloads.ECCOdiags_add","text":"ECCOdiags_add(nam::String)\n\nAdd data to the scratch space folder. Known options for nam include  \"release1\", \"release2\", \"release3\", \"release4\", \"release5\", and \"OCCA2HR1\".\n\nUnder the hood this is the same as:\n\nusing Climatology\ndatadep\"ECCO4R1-stdiags\"\ndatadep\"ECCO4R2-stdiags\"\ndatadep\"ECCO4R3-stdiags\"\ndatadep\"ECCO4R4-stdiags\"\ndatadep\"ECCO4R5-stdiags\"\ndatadep\"OCCA2HR1-stdiags\"\n\n\n\n\n\n","category":"method"},{"location":"API/#Climatology.downloads.MITPROFclim_download-Tuple{}","page":"Files","title":"Climatology.downloads.MITPROFclim_download","text":"MITPROFclim_download()\n\nDownload lazy artifact to scratch space.\n\n\n\n\n\n","category":"method"},{"location":"API/#Climatology.downloads.__init__standard_diags-Tuple{}","page":"Files","title":"Climatology.downloads.__init__standard_diags","text":"__init__standard_diags()\n\nRegister data dependency with DataDep.\n\n\n\n\n\n","category":"method"},{"location":"API/#Climatology.downloads.get_ecco_files","page":"Files","title":"Climatology.downloads.get_ecco_files","text":"get_ecco_files(γ::gcmgrid,v::String,t=1)\n\nusing MeshArrays, Climatology, MITgcm\nγ=GridSpec(\"LatLonCap\",MeshArrays.GRID_LLC90)\nClimatology.get_ecco_variable_if_needed(\"oceQnet\")\ntmp=read_nctiles(joinpath(ScratchSpaces.ECCO,\"oceQnet/oceQnet\"),\"oceQnet\",γ,I=(:,:,1))\n\n\n\n\n\n","category":"function"},{"location":"API/#Climatology.downloads.get_ecco_variable_if_needed-Tuple{String}","page":"Files","title":"Climatology.downloads.get_ecco_variable_if_needed","text":"get_ecco_variable_if_needed(v::String)\n\nDownload ECCO output for variable v to scratch space if needed\n\n\n\n\n\n","category":"method"},{"location":"API/#Climatology.downloads.get_ecco_velocity_if_needed-Tuple{}","page":"Files","title":"Climatology.downloads.get_ecco_velocity_if_needed","text":"get_ecco_velocity_if_needed()\n\nDownload ECCO output for u,v,w to scratch space if needed\n\n\n\n\n\n","category":"method"},{"location":"API/#Climatology.downloads.get_occa_variable_if_needed-Tuple{String}","page":"Files","title":"Climatology.downloads.get_occa_variable_if_needed","text":"get_occa_variable_if_needed(v::String)\n\nDownload OCCA output for variable v to scratch space if needed\n\n\n\n\n\n","category":"method"},{"location":"API/#Climatology.downloads.get_occa_velocity_if_needed-Tuple{}","page":"Files","title":"Climatology.downloads.get_occa_velocity_if_needed","text":"get_occa_velocity_if_needed()\n\nDownload OCCA output for u,v,w to scratch space if needed\n\n\n\n\n\n","category":"method"},{"location":"API/#Climatology.downloads.unpackDV-Tuple{Any}","page":"Files","title":"Climatology.downloads.unpackDV","text":"unpackDV(filepath)\n\nLike DataDeps's :unpack but using Dataverse.untargz and remove the .tar.gz file.\n\n\n\n\n\n","category":"method"}]
}
